/**
 * Created by Zion on 8/14/17.
 */
/**
 * Created by shravass on 7/20/17.
 */
(function () {
    angular
        .module("WAM")
        .controller("AdminController", AdminController);

    function AdminController(currentUser, userService, $anchorScroll, $route) {
        var model = this;
        model.admin = currentUser;
        model.updateProfile = updateProfile;
        model.deleteProfile = deleteProfile;
        model.createProfile = createProfile;
        model.reset = reset;

        function init() {
            userService.findAllUsers().then(function (users) {
                model.users = users;
            });
            model.tab = 0;
        }

        init();

        function deleteProfile(user) {
                userService.deleteUser(user._id)
                    .then(function () {
                        model.message = 'User deleted successfully';
                        userService.findAllUsers().then(function (users) {
                            model.users = users;
                            $anchorScroll('message');
                            if (model.admin._id === user._id) {
                                setTimeout(
                                    function () {
                                        $route.reload();
                                    }, 1000);
                            }
                        }, function () {
                            $route.reload();
                        })
                    }, function () {
                        model.error = " Something went wrong. Please try later";
                        $anchorScroll('error');
                    });
            }

        function updateProfile(user) {
            model.message = null;
            model.error = null;
            var admin = document.getElementById(user._id + '_ADMIN').checked;
            var user_role = document.getElementById(user._id + '_USER').checked;
            var roles = [];
            if (admin) {
                roles.push('ADMIN');
            }
            if (user_role) {
                roles.push('USER');
            }
            if (roles.length === 0) {
                model.error = " One role is required ";
            }
            else {
                user.roles = roles;
                userService.updateUser(user._id, user)
                    .then(function () {
                        model.message = 'User updated successfully';
                        userService.findAllUsers().then(function (users) {
                            model.users = users;
                            $anchorScroll('message');
                            if (model.admin._id === user._id) {
                                setTimeout(
                                    function () {
                                        $route.reload();
                                    }, 1000);
                            }
                        }, function () {
                            $route.reload();
                        })
                    }, function () {
                        model.error = " Something went wrong. Please try later";
                        $anchorScroll('error');
                    });
            }

        }

        function createProfile() {
            model.userError = null;
            if (model.user.password !== model.verifyPassword) {
                model.userError = " Password does not match ";
                var element = document.getElementById('inputPassword');
                element.focus();
                $anchorScroll('top');
            }
            else {
                var flag = 0;
                userService.findUserByUsername(model.user.username)
                    .then(function (user) {
                        if (user !== null)
                        {
                            flag = 1;
                            model.userError = " Username already exists";
                            $anchorScroll('top');
                        }
                    });
                if (flag !== 1) {
                    userService.createUser(model.user)
                        .then(function (status) {
                            if (status) {
                                model.message = 'User created successfully';
                                userService.findAllUsers().then(function (users) {
                                    model.users = users;
                                    model.tab = 0;
                                    $anchorScroll('message');
                                });
                            }
                        }, function () {
                            model.userError = "Oops! Something went wrong. Please try again later";
                            $anchorScroll('top');
                        });
                }
            }
        }

        function reset() {
            model.userError = null;
            model.message = null;
            model.error = null;
            model.user = null;
        }
    }
})();