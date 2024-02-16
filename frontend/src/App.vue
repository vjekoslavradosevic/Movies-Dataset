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
                <div v-if="isAuthenticated" class="link" @click="logoutLocal">Odjava (Lokalno)</div>
                <div v-if="isAuthenticated" class="link" @click="refreshData">Osvježi preslike</div>
                <router-link v-if="isAuthenticated" to="/info"
                    ><div class="link" :class="{ 'link-active': $route.path === '/info' }">Korisnički profil</div>
                </router-link>
            </div>
        </div>
    </nav>
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
                    name: "Početna",
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
        },
        async refreshData() {
            this.$worker.onmessage = async (event) => {
                if (!event.data.present) {
                    //console.log("token nije u workeru, dobavljam novi");
                    this.$worker.postMessage({
                        action: "storeToken",
                        token: await this.$auth0.getAccessTokenSilently(),
                    });
                }

                this.$worker.postMessage({
                    action: "refreshDataset",
                });
            };

            this.$worker.postMessage({
                action: "tokenPresent",
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
