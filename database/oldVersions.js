var insertRelationshipsForOld = function(id) { 
	const driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "neo4j"))
	const session = driver.session();
	if (id % 5 === 0) {
		console.log('processing insertion: ', id);
	}
	var allRelPromises = [];
	var followersNumber = Math.floor(Math.random() * numNodes * maxDensity);
	for (var k = 0; k <= followersNumber; k++) {
		var followerId = Math.floor(Math.random() * numNodes)
		if (followerId !== id) {
			var relationshipPromise = session.run(
				'match (a: Person { id: $id}) match(b: Person {id: $followerId}) merge (a)-[r:follows]->(b)',
				{ id: id, followerId: followerId }
			)
			allRelPromises.push(relationshipPromise);
		}
	}
	Promise.all(allRelPromises)
		.then((result) => {
			session.close();
			driver.close();
			if (id < numNodes) {
				insertRelationshipsFor(id + 1);
			}
		})
		.catch((err) => {
			session.close();
			driver.close();
			console.log('failed to create relationship in db: ', err);
		})
}

var insertNodesOld = function () {
    const driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "neo4j"))
    const session = driver.session();

    var allPromises = []
    for (var i = 0; i < numNodes; i++) {
        if (i % 1000 === 0) {
            console.log("insert node processing: ", i);
        }
        var personName = 'Alice' + i;
        var personId = i;

        var resultPromise = session.run(
            'CREATE (a:Person { name: $name, id: $id})',
            { name: personName, id: personId }
        );

        allPromises.push(resultPromise);
    }

    Promise.all(allPromises)
        .then((result) => {
            session.close();
            driver.close();
        })
        .catch((err) => {
            session.close();
            driver.close();
            console.log("failed to populate db: ", err)
        })
}


// relationship 
var numNodes = 1000;
var maxDensity = 0.1;
var relcount = 0
var relbatch = 1000
var insertRelationshipsFor = function (id) {
	const driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "neo4j"))
	const session = driver.session();
	if (id % 5 === 0) {
		console.log('processing insertion: ', id);
	}
	var allRelPromises = [];
	var followersNumber = Math.floor(Math.random() * numNodes * maxDensity);
	for (var k = 0; k <= followersNumber; k++) {
		var followerId = Math.floor(Math.random() * numNodes)
		if (followerId !== id) {
			var relationshipPromise = session.run(
				'match (a: Person { id: $id}) match(b: Person {id: $followerId}) merge (a)-[r:follows]->(b)',
				{ id: id, followerId: followerId }
			)
			allRelPromises.push(relationshipPromise);
		}
	}
	Promise.all(allRelPromises)
		.then((result) => {
			id += 1000
			if (id > numNodes) {
				session.close();
				driver.close();
			}

			insertRelationshipsFor(id + 1000);

		})
		.catch((err) => {
			session.close();
			driver.close();
			console.log('failed to create relationship in db: ', err);
		})
}