<template>
    <form @submit.prevent="handleSubmit">
        <div class="div-form">
            <div class="checkboxes">
                <div class="checkbox-item">
                    <input type="checkbox" v-model="criteria.title" />
                    <label>Title</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" v-model="criteria.release_date" />
                    <label>Release date</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" v-model="criteria.director_firstname" />
                    <label>Director's firstname</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" v-model="criteria.director_lastname" />
                    <label>Director's lastname</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" v-model="criteria.actor_firstname" />
                    <label>Actor's firstname</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" v-model="criteria.actor_lastname" />
                    <label>Actor's lastname</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" v-model="criteria.duration" />
                    <label>Duration (minutes)</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" v-model="criteria.genres" />
                    <label>Genres</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" v-model="criteria.everything" />
                    <label>*</label>
                </div>
            </div>
            <div>
                <input type="text" v-model="input" /><br />
                <button class="submit">Submit</button>
            </div>
        </div>
    </form>
</template>

<script>
export default {
    data() {
        return {
            criteria: {
                title: false,
                release_date: false,
                director_firstname: false,
                director_lastname: false,
                actor_firstname: false,
                actor_lastname: false,
                duration: false,
                genres: false,
                everything: true,
            },
            input: "",
            data: [],
        };
    },
    methods: {
        async handleSubmit() {
            let response = await fetch("http://localhost:3000", {
                method: "GET",
                body: JSON.stringify({
                    criteria: this.criteria,
                    input: this.input,
                }),
            });
            this.data = await response.json();
            console.log(this.data);
        },
    },
};
</script>

<style>
.div-form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 50vw;
    height: 50vh;
    justify-items: center;
    align-items: center;
    margin: 20px auto;
    border-radius: 5px;
    border: 1px solid #a9fbd6fe;
}
.checkboxes {
    width: 100%;
    height: 70%;
}
.checkbox-item {
    margin: auto;
    width: 70%;
    height: 30px;
}
input[type="checkbox"] {
    display: inline-block;
    width: 16px;
    margin: 0 30px 0 70px;
    position: relative;
    top: 2px;
}
input[type="text"] {
    height: 30px;
    width: 200px;
    border-radius: 5px;
}
.submit {
    margin: 15px auto;
    padding: 10px;
    background-color: #10e887;
    border-radius: 5px;
    border: 1px solid #10e887;
}
</style>
