var axios = require('axios')
axios({
        method: "get",
        url: 'http://127.0.0.1:3000/followers',
        params: { user_id: 1}
    })
    .then((result)=> { 
        // console.log("result from social graph: ", result.data)
    })
    .catch((err) => { 
        console.log('failed post request to social graph: ', err)
        throw err;
    })
