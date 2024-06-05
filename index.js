// index.js
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const db = require('./database');

const app = express();

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

const server = new ApolloServer({ typeDefs, resolvers, context: { db } });

server.start().then(res => {
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
});
