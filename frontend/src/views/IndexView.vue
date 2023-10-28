<template>
    <div>
        <button @click="downloadCSV">Download CSV</button>
        <button @click="downloadJSON">Download JSON</button>
    </div>
</template>

<script>
export default {
    methods: {
        createAnchor(path, name) {
            const link = document.createElement("a");
            link.href = path;
            link.download = name;

            return link;
        },
        downloadCSV() {
            //putanja do .csv datoteke u odnosu na index.html
            const csvFilePath = "./data/movies.csv";
            this.createAnchor(csvFilePath, "movies.csv").click();
        },
        downloadJSON() {
            const jsonFilePath = "./data/movies.json";
            this.createAnchor(jsonFilePath, "movies.json").click();
        },
    },
};
</script>
