const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema 

const PostSchema = new Schema({
    title : String,
    content : String,
    dateCreated : {
        type : Date,
        default : Date.now,
    },
});

// Create Model

const Post = mongoose.model('Post', PostSchema);

// Module export

module.exports = Post