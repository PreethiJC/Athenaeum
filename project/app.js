module.exports = function (app) {
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/athenaeum');
    mongoose.Promise = require('q').Promise;

    require('./services/search.service.server')(app);
};
