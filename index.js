// index.js

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const initializeDatabase = require('./database');

async function startApolloServer() {
    const app = express();

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: async () => ({
            db: await initializeDatabase()
        }),
    });

    await server.start(); // Démarrer le serveur Apollo
    console.log("serveur lancer");

    server.applyMiddleware({ app }); // Appliquer le middleware d'Apollo au serveur Express

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () =>
        console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`)
    );
}

startApolloServer().catch(err => {
    console.error('Failed to initialize server:', err);
    process.exit(1);
});
