const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const postRoutes = require('./routes/postRoute');
// parser json requests
app.use(bodyParser.json());
// parse url encoded requests
app.use(bodyParser.urlencoded({extended: true}));
// parse raw requests
app.use(bodyParser.raw());
app.use('/api', postRoutes);

app.get('/', (req, res) => {
    res.status(200).json({
        message: "hello"
    });
});


module.exports  = app;