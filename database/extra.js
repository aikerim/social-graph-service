
/*
var exportCSVPromise = session.run(
	'import-cypher -o file1.csv MATCH (a:Person) RETURN a.id as ID, a.name as NAME'
)
exportCSVPromise.then(() => {
	session.close()
	console.log('export result: ')
	driver.close()
})
exportCSVPromise.catch((err)=> { 
	session.close()
	throw err;
})
*/

// reading all the Person label 
/*
for ( var i = 0; i <= 1000; i++ ) { 
	var personId = i; 
	var fetchPromise = session.run(
		'MATCH (a:Person { id: $id}) RETURN a.id as ID, a.name as NAME LIMIT 10000',
		{id: i}
	)
	fetchPromise.then((result) => { 
		 
		if(i===1001) { 
			session.close()
			
		}
		if(result.records.length !== 0) { 
			for ( var i = 0; i < result.records.length; i++) { 
				console.log(result.records[i].get(0), ":", result.records[i].get(1))
			}			
		}
		driver.close()
	})
	.catch((err)=>{ 
		session.close()
		throw err;
		
	})
}
*/