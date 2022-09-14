const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema (
    {
       title: { type: String, required:true, maxLength: 100 },
       blogText: { type: String, required: true },
       published: { type: Boolean, default: false },
       time: { type: Date, default: Date.now },
    }
);

//Vritual for post's URL
PostSchema.virtual('url').get(function() {
    return `/api/posts/${this._id}`;
});

module.exports = mongoose.model('Post', PostSchema);