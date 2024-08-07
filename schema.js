const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
        posts: [Post]
    }

    type Post {
        id: ID!
        title: String!
        content: String!
        user: User!
    }

    type Order {
    id: ID!
    userId: ID!
    total: Float!
    createdAt: String!
    user: User
  }

    type Query {
        users: [User]
        posts: [Post]
        user(id: ID!): User
        post(id: ID!): Post
        orders: [Order]
        order(id: ID!): Order
    }

    type Mutation {
        addUser(name: String!, email: String!): User
        updateUser(id: ID!, name: String!, email: String!): User
        deleteUser(id: ID!): User
        addPost(userId: ID!, title: String!, content: String!): Post
        updatePost(id: ID!, title: String!, content: String!): Post
        deletePost(id: ID!): Post
        addOrder(userId: ID!, total: Float!): Order
    }
`;

module.exports = typeDefs;
