// server.js
// TODO:
// - add sanitization

require('dotenv').config();

const OpenAI = require("openai");
const openai = new OpenAI({
    organization: "org-OfVVLbO2OaDC7ZeSSMdLAh92",
    project: "proj_DDpFaXcvOpoN0C26ieZiuDx1",
    apiKey: process.env.OPENAI_KEY
});

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8888;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/public');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.render("index", { output: "<p>Your recipe will appear here.</p>" });
})

app.get("/about", (req, res) => {
    res.render("about");
})

app.post('/api', async (req, res) => {
    const data = req.body;
    console.log(data);
    
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a code generator." },
            {
                role: "user",
                content: "Generate a recipe formatted in HTML as it would appear in the <body> section for the most prominent food item in the movie " + data.movietitle + ", prefaced with a description of the scene that this food item is found in. This response should be on one line (contains no \\n character) and should contain no additional text or characters strictly beyond the HTML content. The class of all <div>, <ul>, <li>, and <h1> elements should be \"response\" in order to differentiate the content of this recipe from the rest of the page.",
            },
        ],
    });

    console.log(completion.choices[0].message);
    res.render("index", { output: completion.choices[0].message.content.replace("`", "") });
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
