<template>
    <table>
        <tr>
            <th v-for="(value, key) in data[0]">{{ key }}</th>
        </tr>
        <tr v-for="movie in data">
            <td>{{ movie["Title"] }}</td>
            <td>{{ movie["Release date"] }}</td>
            <td>{{ movie["Director"] }}</td>
            <td>{{ movie["Producer"] }}</td>
            <td>{{ movie["Duration"] }}</td>
            <td>{{ movie["Actors"] }}</td>
            <td>{{ movie["Genres"] }}</td>
            <td>{{ movie["Oscars"] }}</td>
            <td>{{ movie["Box office"] }}</td>
        </tr>
    </table>
</template>

<script>
export default {
    props: ["data"],
};
</script>

<style>
table {
    width: 95vw;
    margin: auto;
    border: 3px solid #00af60;
    border-collapse: collapse;
    border-spacing: 0;
    background-color: #a9fbd6fe;
}
td {
    white-space: pre-line;
    text-align: center;
    border: 3px solid #00af60;
}
th {
    border: 3px solid #00af60;
}
</style>
