var express = require('express');
var Router = express.Router;
var fetchNodeConnections = require('./helpers/fetchNodeConnections')
var getTweetInteractors = require('./helpers/getTweetInteractors.js')
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
    const inputTweets = JSON.parse(req.query.tweet_ids);
    const finalresult = [];
    const user_id = Number(req.query.user_id);
    var tweet_id;
    const callback = function (connections) {
        var nodeconnections = connections;
        var finalTweetInteractor = [];
        var result;
        var callbackNext = function (tweetInteractors) {
            result = computeCommonality(nodeconnections, tweetInteractors).length === 0 ? false : true;
            finalTweetInteractor.push(result);
            // finalTweetInteractor.push(tweetInteractors);
            if (finalTweetInteractor.length === inputTweets.length) {
                // console.log("Done: ", finalTweetInteractor)
                res.status(200).send(JSON.stringify(finalTweetInteractor))
            }
        }
        for (var i = 0; i < inputTweets.length; i++) {
            tweet_id = Number(inputTweets[i])
            getTweetInteractors(tweet_id, callbackNext)
        }

    }
    fetchNodeConnections(user_id, callback)
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