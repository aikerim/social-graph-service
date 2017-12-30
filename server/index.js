// Add this to the VERY top of the first file loaded in your app
// var apm = require('elastic-apm').start({
//     // Set required app name (allowed characters: a-z, A-Z, 0-9, -, _, and space)
//     appName: 'socialGraph',
//     // Use if APM Server requires a token
//     secretToken: '',
//     // Set custom APM Server URL (default: http://localhost:8200)
//     serverUrl: ''
// })

var express = require('express');
var dotenv = require('dotenv');
var router = require('./routes');
const bodyParser = require("body-parser");

// config({path: 'custom/path/to/your/env/var'})
dotenv.config();
const localserver = express();
localserver.use(bodyParser.json());

localserver.use('/', router);

localserver.use('/followers', router)
localserver.use('/friendConfirmation', router)
localserver.use('/TweetServiceSimulator', router)
localserver.use('/randomPromotedQuery', router)

// localserver.use('')
const port = process.env.PORT || 8080;

if (!module.parent) {
    localserver.listen(port);
}
console.log(`Listening at http://localhost:${port}`);
module.exports = localserver;