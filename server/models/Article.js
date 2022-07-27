const { Schema, model } = require('mongoose');
var moment = require('moment');

const commentSchema = require('./Comment');

const articleSchema = new Schema(
  {
    userId: {
      type: ID,
      required: true,
    },
    articleDate: {
      type: Date,
    },
    postDate: {
      type: Date,
      default: Date.now,
      get: (timestamp) => moment(timestamp).format('MMMM Do YYYY, h:mm:ss a'),
    },
    source: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    url: {
      type: String,
    },
    username: {
      type: String,
    },
    comments: [commentSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

articleSchema.virtual('commentCount').get(function () {
  return this.comments.length;
});

const Article = model('Article', articleSchema);

module.exports = Article;
