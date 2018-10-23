const express = require('express');
const path = require('path'); 
const app = express(); 

app.use(express.static(path.join(__dirname, '../react-client/build')));


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