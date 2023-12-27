<template>
    <nav>
        <div class="nav">
            <h1>{{ title }}</h1>
            <div class="links">
                <router-link :to="link.href" v-for="link in links"
                    ><div class="link" :class="{ 'link-active': $route.path === link.href }">
                        {{ link.name }}
                    </div>
                </router-link>
                <div v-if="!isAuthenticated" class="link" @click="login">Prijava</div>
                <div v-if="isAuthenticated" class="link" @click="logout">Odjava (Auth0)</div>
                <div v-if="isAuthenticated" class="link" @click="logoutLocal">Odjava (Local)</div>
                <div v-if="isAuthenticated" class="link" @click="refreshData">Refresh data</div>
                <router-link to="/info"
                    ><div class="link" :class="{ 'link-active': $route.path === '/info' }">User Info</div>
                </router-link>
            </div>
        </div>
    </nav>
    <div>user: {{ user }}</div>
    <router-view />
</template>

<script>
export default {
    data() {
        return {
            title: "Movies Dataset",
            user: this.$auth0.user,
            isAuthenticated: this.$auth0.isAuthenticated,
            links: [
                {
                    name: "Index",
                    href: "/",
                },
                {
                    name: "Datatable",
                    href: "/datatable",
                },
            ],
        };
    },

    methods: {
        login() {
            this.$auth0.loginWithRedirect();
        },
        logout() {
            this.$auth0.logout({ logoutParams: { returnTo: window.location.origin } });
        },
        logoutLocal() {
            this.user = null;
            this.isAuthenticated = false;

            this.$worker.postMessage({
                action: "deleteToken",
            });

            const cookies = document.cookie.split(";");

            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i];
                const eqPos = cookie.indexOf("=");
                const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=localhost";
            }

            console.log("Cookies cleared.");

            console.log("user: ", this.$auth0.user);
            console.log("isAuthenticated: ", this.$auth0.isAuthenticated);
        },
        refreshData() {
            this.$worker.onmessage = async (event) => {
                let accessToken = event.data.token;

                if (!accessToken) {
                    accessToken = await this.$auth0.getAccessTokenSilently();

                    this.$worker.postMessage({
                        action: "storeToken",
                        token: accessToken,
                    });
                }

                let response = await fetch("http://localhost:3000/private", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                let data = await response.json();
                console.log(data);
            };

            this.$worker.postMessage({
                action: "retrieveToken",
            });
        },
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #383838;
}

body {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

h1 {
    margin: 20px;
    font-weight: bold;
}

div.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #00874b;
    border-radius: 0px 0px 10px 10px;
}

div.links {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.link {
    margin: 15px 15px 15px 0;
    padding: 15px;
    background-color: #00874b;
    border-radius: 5px;
    font-weight: bold;
    color: #383838;
}

.link:hover {
    cursor: pointer;
}

.link-active {
    background-color: #10e887;
    color: white;
}

nav a {
    font-weight: bold;
    text-decoration: none;
}

nav a.router-link-exact-active {
    color: white;
}
</style>
