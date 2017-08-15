/**
 * Created by Zion on 7/19/17.
 */
var mongoose = require('mongoose');
var discussionSchema = require('./discussion.schema.server');
var discussionModel = mongoose.model('DiscussionModel', discussionSchema);

discussionModel.createDiscussion = createDiscussion;
discussionModel.findDiscussionById = findDiscussionById;
discussionModel.findAllDiscussions = findAllDiscussions;
discussionModel.findDiscussionsByTopic = findDiscussionsByTopic;
discussionModel.updateDiscussion = updateDiscussion;

module.exports = discussionModel;

function createDiscussion(discussion) {
    return discussionModel.create(discussion);
}

function findDiscussionById(discussionId) {
    return discussionModel.findById(discussionId);
}

function findAllDiscussions() {
    return discussionModel.find();
}

function findDiscussionsByTopic(topic) {
    return discussionModel.findOne({topic: topic});
}


function updateDiscussion(topic, comments) {

    return discussionModel.update({topic: topic}, {$set: comments});
}

// function deleteDiscussion(userId) {
//     return discussionModel.remove({_id: userId});
// }


