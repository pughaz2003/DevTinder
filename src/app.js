const express = require("express");

const app = express();



app.use("/hello", (req, res) => {
    res.send("hello from the another route!");
    });

app.use("/test", (req, res) => {
res.send("hello from the server!");
});

app.listen(3000, () => {
    console.log("server is listenning on port 3000");
    
});

