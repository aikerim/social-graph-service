const neo4j = require('neo4j-driver').v1; 

var fetchNodeConnections = function (user_id, callback) {
    
    const driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "neo4j"))
    const session = driver.session();
    var findFollows = session.run(
        'match (u: tweetUsers {id: $id})-[r:follows]->(all: tweetUsers) return all',
        { id: user_id }
    )
    findFollows.then((result) => {
        session.close()
        var results = []
        for (var i = 0; i < result.records.length; i++) {
            if (result.records.length !== 0) {
                results.push(result.records[i].get(0).properties.id.low)
            }
        }
        // console.log(results.length)    
        // console.log('results: ', results)
        driver.close()
        return callback(results)
    })
    findFollows.catch((err) => {
        console.log(err)
        session.close();
        driver.close();
        throw err; 
    })
    // console.log("Find follows: ", findFollows)
}

module.exports = fetchNodeConnections