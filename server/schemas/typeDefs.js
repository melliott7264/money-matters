const { gql } = require('apollo-server-express');

// Mutation names and arguments (including types) must match contents of mutations file on front-end

const typeDefs = gql`
  type Query {
    me: User
    articles: Article
    article: Article
    comments: Comment
    comment: Comment
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveArticle(
      articleDate: String!
      postDate: String!
      source: String!
      title: String!
      description: String!
      url: String!
      username: String!
    ): Article
    removeArticle(_id: ID!): Article
    addComment(articleId: ID!, commentBody: String!): Comment
    removecomment(_id: ID!, articleId: ID!): Comment
    editcomment(_id: ID!, commentBody: String!): Comment
  }

  type User {
    _id: ID
    username: String
    email: String
    savedArticles: [Articles]
  }

  type Article {
    _id: ID
    userId: ID
    articleDate: Date
    postDate: Date
    source: String
    title: String
    description: String
    url: String
    username: String
    comments: [Comments]
  }

  type Comment {
    _id: ID
    articleId: ID
    commentBody: String
    postDate: Date
    username: String
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
