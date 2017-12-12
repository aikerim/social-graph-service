import express from 'express'; 
import dotenv from 'dotenv';
import router from './routes' 
// config({path: 'custom/path/to/your/env/var'})
dotenv.config();
const localserver = express(); 

// console.log('dotenv: ', process.env.PORT)
localserver.use('/', router);
// const PORT = process.env.PORT || 8080; 
const port = process.env.PORT || 8080; 


localserver.listen(port); 
console.log(`Listening at http://localhost:${port}`);
export default localserver;