const express = require("express");

const app = express();

const {adminAuth} = require("./middleware/auth");

app.get("/admin", adminAuth);



    

app.get("/admin/getAllData", (req, res) => {
res.send("hello from the server!");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("deleted");
  });
  


app.listen(3000, () => {
    console.log("server is listenning on port 3000");
    
});

