const fs = require('fs');
const express = require('express');
const cors = require('cors');
const { ApolloServer, gql } = require('apollo-server-express');
const { createServer } = require('http');
const { getResolvers } = require('./resolvers');
const { validateTokensMiddleware } = require('./middlewares/validateTokensMiddleware');
const schema = fs.readFileSync(__dirname.concat('/schema.graphql'), 'utf8');
require('dotenv').config()

const PORT = process.env.SERVER_PORT || 3001;

const db = require('../db/knex');

const typeDefs = gql(schema);

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers: getResolvers({ db }),
  context: ({ req, res }) => ({ req, res })
});

const app = express();

app.use(cors());

app.use(validateTokensMiddleware);

apolloServer.applyMiddleware({ app });

const httpServer = createServer(app);

httpServer.listen({ port: PORT }, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`);
});
