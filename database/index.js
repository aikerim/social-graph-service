
const neo4j = require('neo4j-driver').v1; 

var setConstraints = function() { 
	const driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "neo4j"))
	const session = driver.session();
	var constraintPromise = session.run(
	'create constraint on (animal: Animal) assert animal.id is unique'
	)
	constraintPromise.then(() => {
		session.close()
		console.log("added constraint on id")
		driver.close()
		insertNodes(0, 10000, 10000, 100000); 

	})
	constraintPromise.catch((err) => {
		session.close()
		throw err

	})
}


var insertNodes = function(current, batchTarget, batchSize, targetNumNodes){
	const driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "neo4j"))
	const session = driver.session();
	if (current === targetNumNodes) {
		session.close();
		driver.close();
		return;
	}
	var allPromises = [];
	for (var i = current; i < batchTarget; i++, current++) {
		// current++;
		// if (i%1000===0) { 
		// 	console.log("insert node processing: ", i);
		// }
 		var personName = 'Tunay' + i;
		var personId = i;

		var resultPromise = session.run(
			'CREATE (a:Animal { name: $name, id: $id})',
			{ name: personName, id: personId }
		);

		allPromises.push(resultPromise);
	}
	console.log("inserted nodes: ", current);

	Promise.all(allPromises)
	.then((result)=> { 
		// batch += 1000
		// if ( batch > 100000) { 
	
		// }
		session.close()
		driver.close()
		insertNodes(current, batchTarget + batchSize, batchSize, targetNumNodes);
	})
	.catch((err)=> { 
		session.close();
		driver.close();
		console.log("failed to populate db: ", err)
	})
}

// setConstraints();
// insertNodes(current, limit)
// insertRelationshipsFor(relbatch);	

// var fetchNodeConnections = function(user_id) { 
// 	const driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "neo4j"))
// 	const session = driver.session();
// 	var findFollows = session.run(
// 		'match (u: Person {id: $id})-[r:follows]->(all: Person) return all', 
// 		{id: user_id}
// 	) 
// 	findFollows.then((result)=> { 
// 		session.close()
// 		// console.log(result.records)
// 		for ( var i = 0; i < result.records.length; i++) { 
// 			if (result.records.length !== 0)  {
// 				console.log(result.records[i].get(0).properties.id)
// 			}
// 		}
// 		driver.close()
// 	})
// 	findFollows.catch((err)=>{ 
// 		console.log(err)
// 		session.close();
// 		driver.close();
// 		// throw err; 
// 	})
// }
// fetchNodeConnections(100)

