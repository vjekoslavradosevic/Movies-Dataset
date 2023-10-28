<template>
    <nav>
        <div class="nav">
            <h1>{{ title }}</h1>
            <div class="links">
                <router-link :to="link.href" @click="setActive(link)" v-for="link in links"
                    ><div class="link" :class="{ 'link-active': link.active }">
                        {{ link.name }}
                    </div>
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
            links: [
                {
                    name: "Index",
                    href: "/",
                    active: true,
                },
                {
                    name: "Database",
                    href: "/database",
                    active: false,
                },
            ],
        };
    },
    methods: {
        setActive(link) {
            this.links.forEach((link) => (link.active = false));
            link.active = true;
        },
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}

body {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

h1 {
    margin: 20px;
    font-weight: bold;
    color: #2e2e2e;
}

div.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #00874b;
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
}

.link-active {
    background-color: #10e887;
    color: white;
}

nav a {
    font-weight: bold;
    color: #383838;
    text-decoration: none;
}

nav a.router-link-exact-active {
    color: white;
}
</style>
