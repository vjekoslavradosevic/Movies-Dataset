<template>
    <Info />
    <div class="grid height-40">
        <div class="container">
            <div class="download-link" @click="downloadCSV">Download CSV</div>
            <p>
                CSV, or Comma-Separated Values, is a versatile file format used for storing structured data. Each row in
                a CSV file represents a record, with data separated by commas. While the standard delimiter is a comma,
                other delimiters like semicolons or tabs can be used. CSV files find extensive use in data exchange and
                storage due to their simplicity and broad support among various software applications.
            </p>
        </div>
        <div class="container">
            <div class="download-link" @click="downloadJSON">Download JSON</div>
            <p>
                JSON, or JavaScript Object Notation, is a widely used data interchange format. It is a lightweight,
                human-readable format that is easy for both people and machines to understand. JSON data is structured
                as key-value pairs, making it ideal for representing complex data structures. JSON's simplicity and
                flexibility have led to its widespread adoption in web development, APIs, and data storage.
            </p>
        </div>
    </div>
</template>

<script>
import Info from "../components/Info.vue";
import { exportToJSON, toCSV } from "../utils/exportFunctions";
export default {
    components: { Info },
    methods: {
        async downloadCSV() {
            let response = await fetch("http://localhost:3000/data/movies.csv");
            let data = await response.text();
            toCSV(data).click();
        },
        async downloadJSON() {
            let response = await fetch("http://localhost:3000/data/movies.json");
            let data = await response.json();
            exportToJSON(data).click();
        },
    },
};
</script>

<style>
.grid {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 1fr 1fr;
    margin: 20px;
}

.height-40 {
    height: 40vh;
}

.container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    border-radius: 10px;
    border: 1px solid #a9fbd6fe;
}

.container:hover {
    background-color: #a9fbd6fe;
}

.download-link {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    margin: 20px;
    background-color: #00af60;
    border-radius: 5px;
    font-weight: bold;
}
.download-link:hover {
    cursor: pointer;
    background-color: #10e887;
}
p {
    margin: 20px;
    font-size: large;
    letter-spacing: 1px;
}
</style>
