// server.js
// TODO:
// - add sanitization

import OpenAI from "openai";
const openai = new OpenAI({
    organization: "org-OfVVLbO2OaDC7ZeSSMdLAh92",
    project: "proj_DDpFaXcvOpoN0C26ieZiuDx1",
});

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8888;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
})

app.get("/about", (req, res) => {
    res.sendFile(__dirname + "/public/about.html");
})

app.post('/submit', (req, res) => {
    const data = req.body;
    console.log(data);
    //res.send(`<h1 style="text-align: center; 
    //margin-top: 50vh; transform: translateY(-50%);">
    //Form submitted successfully!</h1>`);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});