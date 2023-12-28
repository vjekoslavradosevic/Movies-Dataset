import fs from "fs";
import { createCSV } from "../utils/createCSV.js";

export async function postRefreshHandler(req, res, coll) {
    try {
        let data = await coll.find().toArray();
        const filePath = "C:\\Users\\rados\\Documents\\Movies_dataset\\backend\\public\\data\\";

        let jsonPath = filePath + "movies.json";
        let jsonData = JSON.stringify(data);

        fs.writeFile(jsonPath, jsonData, "utf-8", (err) => {
            if (err) {
                console.error("Error writing file:", err);

                res.set("Content-Type", "application/json; charset=utf-8");
                res.status(500).send({
                    status: "Internal Server Error",
                    message: "Error on the server side.",
                    response: null,
                });
                return;
            } else {
                console.log("JSON file refreshed successfully.");
            }
        });

        let csvPath = filePath + "movies.csv";
        let csvData = createCSV(data);

        fs.writeFile(csvPath, csvData, "utf-8", (err) => {
            if (err) {
                console.error("Error writing file:", err);

                res.set("Content-Type", "application/json; charset=utf-8");
                res.status(500).send({
                    status: "Internal Server Error",
                    message: "Error on the server side.",
                    response: null,
                });
                return;
            } else {
                console.log("CSV file refreshed successfully.");
            }
        });

        res.set("Content-Type", "application/json; charset=utf-8");
        res.status(200).send({
            status: "OK",
            message: "Dataset refreshed successfully.",
            response: null,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            status: "Internal Server Error",
            message: "Error on the server side.",
            response: null,
        });
    }
}
