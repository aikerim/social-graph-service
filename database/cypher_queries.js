//getting all the followers 
match(u: tweetUsers { id: $id }) - [r: follows] -> (all: tweetUsers) return all

//getting all the labels
match(u: tweetUsers) return distinct labels(u)

//fetching users
USING PERIODIC COMMIT
load csv with headers from "file:///generateEdgeTest.csv" as csvLine
match(a: tweetUsers { id: toInteger(csvLine.userId) }) match(b: tweetUsers { id: toInteger(csvLine.followerId) }) merge(a) - [r: follows] -> (b);

