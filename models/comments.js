const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema (
    {
       comment: { type: String, required: true },
       username: { type: String, required: true },
       postId: [{ type: Schema.Types.ObjectId , ref: 'Post'}],
       time: { type: Date, default: Date.now },
    }
);

module.exports = mongoose.model('Comment', CommentSchema);