

var fs = require('fs')
const neo4j = require('neo4j-driver').v1;

var setConstraints = function () {
    const driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "neo4j"))
    const session = driver.session();
    var constraintPromise = session.run(
        'create constraint on (user: tweetUsers) assert user.id is unique'
    )
    constraintPromise.then(() => {
        session.close()
        console.log("added constraint on id")
        driver.close()
        // insertNodes(0, 10000, 10000, 100000);

    })
    constraintPromise.catch((err) => {
        session.close()
        driver.close()
        throw err

    })
}

var generateEdges = function (start, nodeCount) {
    var line;
    var followersNumber, followerId;
    var stream = fs.createWriteStream('generateEdgeTest.csv', { flags: 'w' });
    var header = "\"userId\",\"followerId\"\n";
    stream.write(header);
    for (var i = start; i < nodeCount; i++) {
        if (i%1000 === 0) { 
            console.log('writing: ', i);
        }
        followersNumber = Math.floor(Math.random() * 400)
        for ( var k = 0; k < followersNumber; k++) { 
            followerId = Math.floor(Math.random() * 50000)
            line = "\"" + i + "\",\"" + followerId + '\"\n';
            stream.write(line);
        }
    }
}
setConstraints()
generateEdges(0, 5000)


// var generateNodes = function (nodeCount) {
//     var o = fs.openSync('someFile.csv', 'w');
//     var line;
//     var stream = fs.createWriteStream('someFile.csv', { flags: 'w' });
//     var header = "\"id\",\"name\"\n";
//     stream.write(header);
//     for (var i = 0; i < nodeCount; i++) {
//         if (i % 1000 === 0) {
//             console.log('writing: ', i);
//         }
//         line = "\"" + i + "\",\"Aygerim" + i + '\"\n';
//         stream.write(line);
//     }
// }