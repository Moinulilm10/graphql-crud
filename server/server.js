import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql
  type Query {
    getUsers: [User]
    getUserById(id: ID!): User
  }

  type Mutation {
    createUser(name: String!, age: Int, isMarried: Boolean): User
  }

  type User {
    id: ID!
    name: String!
    age: Int
    isMarried: Boolean
  }



`;

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
