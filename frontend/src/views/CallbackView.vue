<template></template>

<script>
export default {
    data() {
        return {
            accessToken: null,
        };
    },
    async mounted() {
        const code = this.$route.query.code;
        if (code) {
            try {
                this.accessToken = await this.$auth0.getAccessTokenSilently();
                this.storeToken();
                this.$router.push("/");

                //znaci sa this.$auth0.idTokenClaims dobivam vec parsirane claims van -> kao sto bi dobio da access token posaljem na /userinfo
                //a ako pod this.$auth0.idTokenClaims._value.__raw dobijem bas jwt id tokena
                //console.log("id token: ", this.$auth0.idTokenClaims._value.__raw);
            } catch (error) {
                console.error("Error handling redirect callback:", error);
            }
        } else {
            console.error("Authorization code not found in the URL");
        }
    },
    methods: {
        storeToken() {
            this.$worker.postMessage({
                action: "storeToken",
                token: this.accessToken,
            });
        },
    },
};
</script>
