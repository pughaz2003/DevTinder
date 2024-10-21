const express = require("express");

const app = express();

app.delete("/user", (req, res) => {
    res.send("deleted successfully!");
    });

app.get("/user", (req, res) => {
    res.send({name:'pughaz',age:'21'});
    });

app.post("/user", (req, res) => {
res.send("hello from the server!");
});



app.listen(3000, () => {
    console.log("server is listenning on port 3000");
    
});

