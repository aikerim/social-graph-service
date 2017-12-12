// var express = require('express'); 
// var Router = express.Router;
import { Router} from 'express'; 
const router = Router(); 
router.get('/', (req, res) => { 
    // res.status(200).send(JSON.stringify({'message': 'Hello World!!!'}));
    res.status(200).send({"message": "Hello World!"});
})
// module.exports=router;
export default router;