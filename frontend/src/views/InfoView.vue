<template>
    <div v-if="user" class="user-info">
        <img :src="user.picture" alt="User Profile Picture" />
        <h1>
            Hello, <span id="nickname">{{ user.nickname }}</span
            >!
        </h1>
        <p>
            Name: <span id="email">{{ user.name }}</span>
        </p>
        <p>
            Email: <span id="email">{{ user.email }}</span>
        </p>
        <p>
            Email Verified: <span id="email-verified">{{ user.email_verified }}</span>
        </p>
        <p>
            Updated At: <span id="updated-at">{{ user.updated_at }}</span>
        </p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: this.$auth0.user,
        };
    },
    mounted() {
        if (!this.user) {
            this.$router.push("/");
        }
    },
};
</script>

<style scoped>
h1 {
    color: #333;
}
.user-info {
    background-color: #fff;
    border-radius: 8px;
    padding: 50px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 60vw;
    margin: 50px auto;
}
img {
    border-radius: 50%;
    max-width: 180px;
    margin: 20px;
}
</style>
