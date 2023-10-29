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
                    <input type="checkbox" v-model="criteria['director.firstname']" />
                    <label>Director's firstname</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" v-model="criteria['director.lastname']" />
                    <label>Director's lastname</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" v-model="criteria['actors.firstname']" />
                    <label>Actor's firstname</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" v-model="criteria['actors.lastname']" />
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
                <button class="submit">Search</button>
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
                "director.firstname": false,
                "director.lastname": false,
                "actors.firstname": false,
                "actors.lastname": false,
                duration: false,
                genres: false,
                everything: true,
            },
            input: "",
            data: [],
        };
    },
    methods: {
        packCriteria() {
            let arr = [];
            for (let key of Object.keys(this.criteria)) {
                if (this.criteria[key] && key !== "everything") {
                    arr.push({ [key]: this.input });
                }
            }

            return {
                criteria: arr,
                everything: this.criteria.everything,
            };
        },
        async handleSubmit() {
            try {
                let body = this.packCriteria();

                let response = await fetch("http://localhost:3000", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                });
                this.data = await response.json();
                console.log(this.data);
            } catch (error) {
                console.log(error.message);
            }
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
    background-color: #a9fbd6fe;
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
    margin: 0 30px 0 70px;
    position: relative;
    top: 4px;
    width: 18px;
    height: 18px;
    border: 2px solid black;
}
input[type="checkbox"]:checked {
    accent-color: green;
}
input[type="text"] {
    height: 30px;
    width: 200px;
    padding: 3px;
    border-radius: 5px;
    border: 2px solid #00af60;
    background-color: #a9fbd6fe;
}
.submit {
    font-weight: bold;
    margin: 15px auto;
    padding: 10px;
    background-color: #00af60;
    border-radius: 5px;
    border: 1px solid #00af60;
}
.submit:hover {
    cursor: pointer;
    background-color: #10e887;
    border: 1px solid #10e887;
}
</style>
