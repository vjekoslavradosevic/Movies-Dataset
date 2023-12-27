let accessToken;

onmessage = function (e) {
    if (e.data.action === "storeToken") {
        accessToken = e.data.token;
        console.log("from worker -> token saved -> token: ", accessToken);
    } else if (e.data.action === "retrieveToken") {
        postMessage({ token: accessToken });
    } else if (e.data.action === "deleteToken") {
        accessToken = null;
        console.log("from worker -> token deleted");
    }
};
