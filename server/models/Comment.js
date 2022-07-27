const { Schema, model } = require('mongoose');
var moment = require('moment');

const commentSchema = new Schema(
    {
        commentBody: {
            type: String,
            required: true,
        },
        postDate: {
            type: Date,
            default: Date.now,
            get: timestamp => moment(timestamp).format('MMMM Do YYYY, h:mm:ss a')
        },
        username: {
            type: String,
            required: true
        }
    }
);

module.exports = commentSchema