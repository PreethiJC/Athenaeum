(function(){
    angular
        .module('WAM')
        .factory('userService', userService);

    function userService($http) {
        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            deleteUser: deleteUser,
            updateUser: updateUser,
            unfollow:unfollow,
            deleteBookmark: deleteBookmark,
            findAllUsers:findAllUsers,
            verifyAdmin:verifyAdmin,
            login: login,
            logout: logout,
            loggedin: loggedin,
            register: register
        };
        return api;

        function register(userObj) {
            var url = "/api/project/user";
            return $http.post(url, userObj)
                .then(function (response) {
                    return response.data;
                });
        }

        function loggedin() {
            var url = "/api/project/loggedin";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function logout() {
            var url = "/api/project/logout";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function login(username, password) {
            var url = "/api/project/login";
            var credentials = {
                username: username,
                password: password
            };
            return $http.post(url, credentials)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteBookmark(userId, title) {
            var url = '/api/project/user/' + userId;
            var user;
            return $http.get(url)
                .then(function (response) {
                    user = response.data;
                    var index = user.bookmarked.indexOf(title);
                    user.bookmarked.splice(index, 1);
                    updateUser(userId, user);
                });


        }
        function unfollow(userId, username)
        {
            var url = '/api/project/user/' + userId;
            var user;
            return $http.get(url)
                .then(function (response) {
                    user = response.data;
                    var index = user.following.indexOf(username);
                    user.following.splice(index, 1);
                    updateUser(userId, user);
                });
        }

        function deleteUser(userId) {
            var url = "/api/project/user/"+userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateUser(userId, user) {
            var url = "/api/project/user/"+userId;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function createUser(user) {
            // console.log(user);
            var url = "/api/project/user";
            return $http.post(url, user)
                .then(function (response) {
                    // console.log(response);
                    return response.data;
                });
            // user._id = (new Date()).getTime() + "";
            // user.created = new Date();
            // users.push(user);
            // return user;
        }

        function findUserByUsername(username) {
            var url = "/api/project/user/username/"+username;
            return $http.get(url)
                .then(function (response) {
                    console.log(response.data);
                    return response.data;
                });
            // var user = users.find(function (user) {
            //     return user.username === username;
            // });
            // if(typeof user === 'undefined') {
            //     return null;
            // }
            // return user;
        }

        function findUserById(userId) {
            var url = "/api/project/user/"+userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByCredentials(username, password) {
            var url = "/api/project/user?username="+username+"&password="+password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllUsers(userId) {
            var url = '/api/project/user';
            return $http.get(url)
                .then(function (response) {
                    var users = response.data;
                    var uIDs = [];
                    // var users = response.data;
                    users.forEach(function (u) {
                        if (u._id !== userId) {
                            uIDs.push(u);
                        }
                    });
                    // console.log(uIDs);
                    return uIDs;
                    });
        }

        function verifyAdmin() {
            var url = '/api/project/verifyAdmin';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })

        }
    }
})();