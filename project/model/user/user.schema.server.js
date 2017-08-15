/**
 * Created by Zion on 7/19/17.
 */
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    roles: [{type: String, enum: ['USER', 'ADMIN', 'AUTHOR'], default: 'USER'}],
    bookmarked: Array,
    following: {type: Array},
    followedBy: {type: Array},
    dateCreated: {type: Date, default: Date.now},
    google: {
        id:    String,
        token: String
    }
}, {collection: "User"});

module.exports = userSchema;