const express = require('express');
const app = express();
const path = require("path")

app.use(express.static("client"));

app.get('/*', function(req, res){
   res.sendFile(path.resolve("client","index.html"));
});

app.listen(8090, () => console.log("Server Running..."));