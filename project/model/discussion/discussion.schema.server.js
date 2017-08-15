var mongoose = require('mongoose');

var discussionSchema = mongoose.Schema({
    topic: {type: String, unique: true},
    description: String,
    dateCreated: {type: Date, default: Date.now},
    creatorName: String,
    comments: [{
        username: String,
        comment: String
    }]
}, {collection: "Discussion"});

module.exports = discussionSchema;
/**
 * Created by Zion on 8/15/17.
 */
