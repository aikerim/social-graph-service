# online news and social networking app

> social graph micro-service for twitter clone

## Contributors

social graph micro-service:

Aygerim Sauletkhan
Online news and social networking app:


Aygerim Sauletkhan (social graph)
Patrick Miner (analytics) 
Jiajun Chen (user feed)
Nick Gratzick (tweets)

## Service Architecture ##

Requests come in via direct HTTP requests. Read HTTP requests are added to a Redis queue before being processed.

![architecture]()
When deployed, the service had multiple server instances to increase load capacity. Amazon Elastic load balancer was used to direct HTTP requests to the least busy server. Server, Redis and Neo4j graph database were deployed to a separate EC2 instance. 

## Database Schema ##

Database is Neo4j graph database. 
![neo4j]()
