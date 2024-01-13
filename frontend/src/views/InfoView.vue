<template>
    <div v-if="user" class="user-info">
        <img
            src="https://s.gravatar.com/avatar/6b6cb91d20473078f5fb642ac782bfed?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2For.png"
            alt="User Profile Picture"
        />
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
