const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('../schema/schema');
const mongoose = require('mongoose');
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://user:user@graphql.advo7.mongodb.net/user?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });

// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

const app = express();
const PORT = 3005;

mongoose.connect("mongodb+srv://user:user@graphql.advo7.mongodb.net/react-graphql?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}))

const dbConnection = mongoose.connection;
dbConnection.on('error', error => console.log(`Connection error: ${error}`));
dbConnection.once('open', () => console.log('Connected to DB!'))

app.listen(PORT, error => {
  error ? console.log(error) : console.log('Server started!');
})

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://user:user@graphql.advo7.mongodb.net/user?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("react-graphql").collection("devices");
//   const dbConnection = mongoose.connection;
//   // perform actions on the collection object
//   client.close();
// });