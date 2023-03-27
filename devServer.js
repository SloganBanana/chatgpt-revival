const express = require('express');
const path = require('path');   
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 1111;

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'build')));

// app.get('*', (req, res) => {res.sendFile(path.resolve(__dirname, 'index.html'))});


app.get('*', (req, res) => {res.send("Yes your server is running")})

// app.get('/', (req, res) => {
//     res.send("Yes your server is running")// EDIT
//    });









app.listen(port, function () {
    console.log('App listening on port: ' + port);
   });