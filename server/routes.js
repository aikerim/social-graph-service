var express = require('express'); 
var Router = express.Router;
router.get('/', (req, res) => { 
    // res.status(200).send(JSON.stringify({'message': 'Hello World!!!'}));
    res.status(200).send({"message": "Hello World!"});
})
// module.exports=router;
module.exports =router;