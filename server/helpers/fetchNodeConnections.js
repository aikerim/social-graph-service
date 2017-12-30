const neo4j = require('neo4j-driver').v1; 

var fetchNodeConnections = function (user_id, callback) {
    
    const driver = neo4j.driver("bolt://18.221.0.151:7687", neo4j.auth.basic("neo4j", "aygerim"))
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
        
        driver.close()
        return callback(results)
    })
    findFollows.catch((err) => {
        session.close();
        driver.close();
        throw err;
    })
    // console.log("Find follows: ", findFollows)
}
// fetchNodeConnections(1, (a)=>{ console.log(a)})
module.exports = fetchNodeConnections