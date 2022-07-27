const { AuthenticationError } = require('apollo-server-express');
const { User, Article, Comment } = require('../models');
const { findOneAndDelete, findOneAndUpdate } = require('../models/Comment');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // return all the user information for the current logged in user
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id });

        return userData;
      }
      throw new AuthenticationError('Not logged in');
    },
    // return all the articles saved by all the users
    articles: async (parent, args, context) => {
      const articleData = await Article.find({});

      return articleData;
    },

    // return a specific article by article id
    article: async (parent, { _id }, context) => {
      const articleData = await Article.findById({ _id: _id });

      return articleData;
    },
    // return all comments for the selected article
    comments: async (parent, { articleId }, context) => {
      const commentData = await Comment.find({
        articleId: articleId,
      });

      return commentData;
    },

    // return a specific comment by comment id
    comment: async (parent, { _id }, context) => {
      const commentData = await Comment.findById({ _id: _id });

      return commentData;
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      console.log(email, password);
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },

    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    // Save article to logged in user
    saveArticle: async (
      parent,
      { articleDate, postDate, source, title, description, url },
      context
    ) => {
      if (context.user) {
        const articleData = await Article.create({
          username: context.user.username,
          articleDate: articleDate,
          postDate: postDate,
          source: source,
          title: title,
          description: description,
          url: url,
        });

        const savedArticle = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: {
              savedArticles: articleData._id,
            },
          },
          { new: true }
        );

        return articleData;
      }
      throw new AuthenticationError('Not logged in');
    },
    removeArticle: async (parent, { _id }, context) => {
      if (context.user) {
        const removedArticle = await Article.findOneAndDelete({ _id: _id });

        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedArticles: _id } },
          { new: true }
        );

        return removedArticle;
      }
      throw new AuthenticationError('Not logged in');
    },
    addComment: async (parent, { articleId, commentBody }, context) => {
      if (context.user) {
        commentData = await Comment.create({ commentBody });

        savedComment = await Article.findOneAndUpdate(
          { _id: articleId },
          { $addToSet: { comments: commentData._id } },
          { new: true }
        );

        return commentData;
      }
      throw new AuthenticationError('Not logged in');
    },
    removeComment: async (parent, { commentId, articleId }, context) => {
      if (context.user) {
        commentData = await Comment.findOneAndDelete({ _id: commentId });

        removedComment = await Article.findOneAndUpdate(
          { _id: articleId },
          { $pull: { comments: commentId } },
          { new: true }
        );

        return commentData;
      }
      throw new AuthenticationError('Not logged in');
    },
    editComment: async (parent, { _id, commentBody }, context) => {
      if (context.user) {
        commentData = await findOneAndUpdate(
          { _id: _id },
          { commentBody: commentBody },
          { new: true }
        );

        return commentData;
      }
      throw new AuthenticationError('Not logged in');
    },
  },
};

module.exports = resolvers;
