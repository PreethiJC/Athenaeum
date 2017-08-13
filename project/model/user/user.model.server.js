/**
 * Created by Zion on 7/19/17.
 */
var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findAllUsers = findAllUsers;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.findUserByGoogleId = findUserByGoogleId;
userModel.addBookmark = addBookmark;
userModel.deleteBookmark = deleteBookmark;
userModel.addFollowing = addFollowing;
userModel.deleteFollowing = deleteFollowing;
userModel.addFollower = addFollower;

module.exports = userModel;

function createUser(user) {
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findAllUsers() {
    return userModel.find();
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function findUserByCredentials(username) {
    // console.log(userModel.findOne({username: username}));
    return userModel.findOne({username: username});
}

function updateUser(userId, newUser) {
    delete newUser.password;
    return userModel.update({_id: userId}, {$set: newUser});
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}

function findUserByGoogleId(googleId) {
    return userModel.findOne({'google.id': googleId});
}

function addBookmark(userId, bookMarkName) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.bookmarked.push(bookMarkName);
            return user.save();
        });
}

function deleteBookmark(userId, bookMarkName) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.bookmarked.indexOf(bookMarkName);
            user.bookmarked.splice(index, 1);
            return user.save();
        });
}

function addFollowing(userId, fUserId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.following.push(fUserId);
            return user.save();
        });
}

function deleteFollowing(userId, fUserId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.following.indexOf(fUserId);
            user.following.splice(index, 1);
            return user.save();
        });
}

function addFollower(userId, fUserId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.followedBy.push(fUserId);
            return user.save();
        });
}

