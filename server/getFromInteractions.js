

var axios = require('axios')
axios({
        method: "get",
        url: 'http://127.0.0.1:3000/friendConfirmation',
        params: { user_id: 1, tweet_id: 2 }
    })
    .then((result)=> { 
        // console.log("result from social graph:", result.data.promoted)
    })
    .catch((err) => { 
        console.log('failed to make get request to social graph: ', err)
        throw err;
    })