var express = require('express');
var Router = express.Router;
var fetchNodeConnections = require('../../database/fetchNodeConnections.js')
var getTweetInteractors = require('./getTweetInteractors.js')
var axios = require('axios')
// var requestTweetInteractors = require('./requestTweetInteractors')
const router = Router();

router.get('/', (req, res) => {
    // res.status(200).send(JSON.stringify({'message': 'Hello World!!!'}));
    res.status(200).send({ "message": "Hello World!" });
})
router.get('/randomPromotedQuery', (req, res)=> { 
    var randomUserId = Math.floor(Math.random()*50000);
    // console.log("Hello!")
    axios({
        method: "get",
        url: 'http://127.0.0.1:3000/friendConfirmation',
        params: { user_id: randomUserId }
    })
        .then((result) => {
            // console.log("result: ", result.data.promoted)
            res.status(200).send(result.data.promoted);
        })
        .catch((err) => {
            console.log('failed at randomPromotedQuery: ', err)
            throw err;
        })
})

router.get('/followers', (req, res) => { 
    var callback = function (connectedNodes) {
        // console.log("Followers!: ", JSON.stringify(input))
        res.status(200).send(JSON.stringify({'followers':connectedNodes}));
    }
    // fetch the followers 
    // console.log('request from tweet service: ', req.query.user_id);
    const user_id = Number(req.query.user_id);
    // console.log("User id: ", user_id)
    fetchNodeConnections(user_id, callback);
    
})
router.get('/friendConfirmation', (req, res) => { 
    const computeCommonality = function (arr1, arr2) {
        var results = [];

        for (var i = 0; i < arr1.length; i++) {
            if (arr2.indexOf(arr1[i]) !== -1) {
                results.push(arr1[i]);
            }
        }
        return results;
    }
    const user_id = Number(req.query.user_id);
    const tweet_id = Number(req.query.tweet_id);
    var callback = function (nodeConnections) {
        var result; 
        var callback1 = function(tweetInteractors) { 
            // console.log("tweet interactors: ", tweetInteractors.length)
            // console.log('user followers: ', nodeConnections.length)
            result = computeCommonality(nodeConnections, tweetInteractors).length === 0 ? false : true;
            // console.log('computing ...', result)

            res.status(200).send(JSON.stringify({'promoted': result}))
        }
        getTweetInteractors(tweet_id, callback1);
                
    }    
    fetchNodeConnections(user_id, callback);
    // console.log("ids: ", user_id, tweet_id)
  
})

//simulating the tweet service: 7 followers of id 1 
router.get('/TweetServiceSimulator', (req, res) => { 
    var result = [];
    for (var i = 0; i < 100; i++) { 
        result.push(Math.floor(Math.random() * 50000));
    }
    // console.log('result: ', result)
    res.status(200).send(JSON.stringify({'interactors':result}));
})


module.exports = router;