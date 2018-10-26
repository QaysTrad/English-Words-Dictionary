const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const url = require('url');
const request = require('request');

app.use(express.static(path.join(__dirname, '../react-client/build')));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

var Dictionary = require("oxford-dictionary-api");
var app_id = "QaysTrad https://english-dictonary.herokuapp.com/ 57f0d369";
var app_key = "QaysTrad https://english-dictonary.herokuapp.com/ ede52ba120cd53787ff1cd4bda9593f8";
var dict = new Dictionary(app_id, app_key);

dict.find("ace", function (error, data) {
    if (error)
        return console.log(error);
    console.log(data);
});

app.post('/defWord', (req, res) => {
    console.log(req.body)


    // var YAndedApi = url.format({
    //     protocol:"https",
    //     hostname:"dictionary.yandex.net",
    //     pathname:"api/v1/dicservice/getLangs",
    //     query:{
    //         key:"dict.1.1.20181023T153008Z.8ef85c8b577eca70.bf8f968164b6f1e000cb55e4437b0dca73043394",
    //         text:req.body.word
    //     }
    // })
    // request.get({url: YAndedApi, json: true}, (err, res, json)=>{
    //     var data = {}
    //     if(err || json.code != 200){
    //         this.data = {
    //             err: json.message
    //         }
    //     } else {
    //         data = {
    //             dataText: req.body.word,
    //             dataTrans:json.text
    //         }
    //     }

    //     console.log(data)
    // })
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