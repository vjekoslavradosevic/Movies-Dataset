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
                    <input type="checkbox" v-model="criteria['producer.firstname']" />
                    <label>Producer's firstname</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" v-model="criteria['producer.lastname']" />
                    <label>Producer's lastname</label>
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
                    <input type="checkbox" v-model="criteria.oscars" />
                    <label>Oscars</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" v-model="criteria.box_office" />
                    <label>Box office (millions USD)</label>
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
    <DataTable v-if="data.length" :data="data" />
    <div v-if="link_json" class="download-link" @click="downloadJSON">Download JSON</div>
    <div v-if="link_csv" class="download-link" @click="downloadCSV">Download CSV</div>
</template>

<script>
import DataTable from "../components/DataTable.vue";
import { parseData } from "../utils/parseData";
import { exportToJSON, exportToCSV } from "../utils/exportFunctions";

export default {
    components: { DataTable },
    data() {
        return {
            criteria: {
                title: false,
                release_date: false,
                "director.firstname": false,
                "director.lastname": false,
                "producer.firstname": false,
                "producer.lastname": false,
                "actors.firstname": false,
                "actors.lastname": false,
                duration: false,
                genres: false,
                oscars: false,
                box_office: false,
                everything: true,
            },
            input: "",
            data: [],
            link_json: null,
            link_csv: null,
        };
    },
    methods: {
        packCriteria() {
            let input = this.input;
            let arr = [];

            for (let key of Object.keys(this.criteria)) {
                if (this.criteria[key] && key !== "everything") {
                    if (key === "oscars" || key === "box_office" || key === "duration") {
                        arr.push({ [key]: parseFloat(input) });
                    } else if (key === "release_date") {
                        arr.push({ [key]: `${input}` });
                    } else {
                        arr.push({ [key]: `.*${input}.*` });
                    }
                }
            }

            return {
                criteria: arr,
                everything: this.criteria.everything,
                input: input,
            };
        },
        async handleSubmit() {
            try {
                this.data = [];
                this.link_json = null;
                this.link_csv = null;

                let body = this.packCriteria();

                if (body.input === "") return;

                let response = await fetch("http://localhost:3000", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                });

                let data = await response.json();

                if (response.status === 400) {
                    console.log(data.error);
                } else {
                    this.data = parseData(data);
                    if (data.length) {
                        this.link_json = exportToJSON(data);
                        this.link_csv = exportToCSV(data);
                    } else {
                        this.link_json = null;
                        this.link_csv = null;
                    }
                }
            } catch (error) {
                console.log(error.message);
            }
        },
        downloadJSON() {
            this.link_json.click();
        },
        downloadCSV() {
            this.link_csv.click();
        },
    },
};
</script>

<style>
.div-form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 57vw;
    height: 70vh;
    justify-items: center;
    align-items: center;
    margin: 20px auto;
    border-radius: 5px;
    background-color: #a9fbd6fe;
    border: 3px solid #00af60;
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
