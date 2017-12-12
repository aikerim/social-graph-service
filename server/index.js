var express = require('express'); 
var dotenv = require('dotenv');
var router = require('./routes'); 

// config({path: 'custom/path/to/your/env/var'})
dotenv.config();
const localserver = express(); 

// console.log('dotenv: ', process.env.PORT)
localserver.use('/', router);
// const PORT = process.env.PORT || 8080; 
const port = process.env.PORT || 8080; 

if (!module.parent) {
    localserver.listen(port); 
}
console.log(`Listening at http://localhost:${port}`);
// module.exports = localserver;
module.exports = localserver