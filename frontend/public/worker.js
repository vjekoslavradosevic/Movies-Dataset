let accessToken;

onmessage = async function (e) {
    if (e.data.action === "storeToken") {
        accessToken = e.data.token;
        //console.log("from worker -> token saved -> token: ", accessToken);
    } else if (e.data.action === "tokenPresent") {
        postMessage({ present: Boolean(accessToken) });
    } else if (e.data.action === "deleteToken") {
        accessToken = null;
        //console.log("from worker -> token deleted");
    } else if (e.data.action === "refreshDataset") {
        try {
            //console.log("from worker -> refresh dataset");
            let response = await fetch("http://localhost:3000/refresh-dataset", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            let data = await response.json();
            console.log(data.message);
        } catch (error) {
            console.log(error);
        }
    }
};
