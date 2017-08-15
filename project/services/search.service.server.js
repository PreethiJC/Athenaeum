// module.exports = function (app) {
//     var goodreads = require('goodreads');
//     app.get('/api/project/book/:title', findBookByTitle);
//     app.get('http://localhost:3000/api/project/services', function () {
//         console.log("I am here");
//     });
//
//     function findBookByTitle(req, res) {
//         var title = req.params['title'];
//         var url = "https://www.googleapis.com/books/v1/volumes?q=" + title + "&key=AIzaSyCgSKEdri_DRhHgtj7_oSfPbNlcQC5odiE";
//
//
//         // //var dump = json  {json && res.write(JSON.stringify(json)); res.end()}
//         //
//         // gr = goodreads.client({ 'key': 'T3XmyOG438rZNaDB6kTcHQ', 'secret': 'D3voCuGGxlGhZpcze8KyhT4N8Zx2I2io3mWKhoG70g' })
//         //
//         // gr.searchBooks(title, function (out) {
//         //     out && res.write(JSON.stringify(out));
//         //     res.end();
//         //
//         // });
//     }
// };
// // app.listen(3000);

// var app = require('../../../express');
module.exports = function (app) {
    var express = require('express');
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var userModel = require('../model/user/user.model.server');
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    var profileID;
    var bcrypt = require("bcrypt-nodejs");
    app.use(express.static(__dirname + '/project'));
    //facebook config
    var googleConfig = {
        clientID     : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL  : process.env.GOOGLE_CALLBACK_URL
    };


    app.get('/api/project/user/:userId', findUserById);
    app.get('/api/project/user', findAllUsers);
    app.post('/api/project/user', isAdmin, createUser);
    app.put('/api/project/user/:userId', updateUser);
    app.delete('/api/project/user/:userId', isAdminOrUser, deleteUser);
    app.get('/api/project/verifyAdmin', verifyAdmin);
    app.get('/api/project/user/username/:userName', findUserByUsername);


    app.post('/api/project/login', passport.authenticate('local'), login);
    app.get('/api/project/loggedin', loggedin);
    app.get('/api/project/logout', logout);
    app.post('/api/project/user', register);
    app.get('/auth/project/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    passport.use(new GoogleStrategy(googleConfig, googleStrategy));
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.get('/auth/project/google/callback',
        passport.authenticate('google', {
            failureRedirect: '/project/login'
        }), function (req, res) {
            res.redirect('/project/#!/user/' + req.user._id);
        });

    function register(req, res) {
        var userObj = req.body;
        userModel
            .createUser(userObj)
            .then(function (user) {
                req
                    .login(user, function (status) {
                        res.send(status);
                    });
            });
    }
    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }

    function loggedin(req, res) {
        if (req.isAuthenticated()) {

            res.json(req.user);
        } else {
            res.send('0');
        }
    }


    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials(username)
            .then(function (user) {
                if (user && bcrypt.compareSync(password, user.password)) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            }, function (error) {
                done(error, false);
            });
    }

    function login(req, res) {
        res.json(req.user);
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        userModel
            .deleteUser(userId)
            .then(function (status) {
                res.send(status);
            });
    }

    function updateUser(req, res) {
        var user = req.body;
        userModel
            .updateUser(req.params.userId, user)
            .then(function (status) {
                res.send(status);
            });
    }

    function createUser(req, res) {

        var user = req.body;
        user.roles = ['USER'];
        user.password = bcrypt.hashSync(user.password);
        userModel
            .createUser(user)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                console.log(err);
                res.send(err);
            });
    }

    function findUserById(req, res) {
        var userId = req.params['userId'];

        userModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            });

    }

    function findUserByUsername(req, res) {
        var userName = req.params['userName'];

        userModel
            .findUserByUsername(userName)
            .then(function (user) {
                res.json(user);
            });
    }

    function findAllUsers(req, res) {
        var username = req.query['username'];
        var password = req.query.password;
        if (username && password) {
            userModel
                .findUserByCredentials(username, password)
                .then(function (user) {
                    if (user) {
                        res.json(user);
                    } else {
                        res.sendStatus(404);
                    }
                });
        } else if (username) {
            userModel
                .findUserByUsername(username)
                .then(function (user) {
                    if (user && bcrypt.compareSync(password, user.password)) {
                        res.json(user);
                    } else {
                        res.sendStatus(404);
                    }
                });
        } else {
            userModel
                .findAllUsers()
                .then(function (users) {
                    res.json(users);
                });
        }
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }

    function googleStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            password: bcrypt.hashSync(emailParts[0]),
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return userModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function isAdmin(req, res, next) {
        if (req.isAuthenticated() && req.user.roles.indexOf('ADMIN') !== -1) {
            next();
        }
        else {
            res.sendStatus(401);
        }

    }

    function isAdminOrUser(req, res, next) {
        if (req.isAuthenticated() && req.user.roles.indexOf('ADMIN') !== -1) {
            next();
        }
        else if (req.isAuthenticated() && req.user._id.toString() === req.params.userId) {
            next();
        }
        else {
            res.sendStatus(401);
        }

    }

    function verifyAdmin(req, res) {
        if (req.isAuthenticated() && req.user.roles.indexOf('ADMIN') !== -1) {
            res.json(req.user);
        }
        else {
            res.sendStatus(401);
        }

    }

};




