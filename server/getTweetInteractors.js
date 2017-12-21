var axios = require('axios')
var getTweetInteractors = function(inputtweet_id, callback) { 
   
    // console.log("getting interactors of the current tweet ...")
    
    axios({
        method: "get",
        url: 'http://127.0.0.1:3000/TweetServiceSimulator',
        params: { tweet_id: inputtweet_id }
    })
        .then((result) => {
            // console.log("result from tweet service: ", result.data.interactors)
            callback(result.data.interactors)
        })
        .catch((err) => {
            console.log('failed request to tweet service: ', err)
            throw err;
        })
    
}
module.exports = getTweetInteractors
