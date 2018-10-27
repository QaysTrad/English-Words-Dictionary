const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, '../react-client/build')));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

var Dictionary = require("oxford-dictionary-api");
var app_id = "57f0d369";
var app_key = "ede52ba120cd53787ff1cd4bda9593f8";
var dict = new Dictionary(app_id, app_key);

app.post('/defWord', (req, res) => {
    dict.find(req.body.word, function (error, data) {
        if (error)
            return console.log(error);
        res.send(data)
    });
})

// all the http methods, and the handler functions in the handler file.
app.get('/*', (req, res) => {
    res.sendFile(path.resolve(path.join(__dirname, '../react-client/build/index.html')))
});

const PORT = process.env.PORT || 3000;

if (!module.parent) {
    app.listen(PORT, () => {
        console.log(`The Port : ${PORT}`);
    });
}

module.exports = app;