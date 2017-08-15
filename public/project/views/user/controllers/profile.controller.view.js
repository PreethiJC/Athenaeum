(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);

    function profileController($location, $routeParams, userService) {

        var model = this;

        model.userId = $routeParams['userId'];
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;
        model.redirect = redirect;
        model.deleteBookmark = deleteBookmark;
        model.unfollow = unfollow;

        function redirect(title) {
            if (typeof(model.userId) === 'undefined')
                $location.url('/search/' + title);
            else
                $location.url('/user/' + model.userId + '/search/' +title)
        }
        function init() {
            userService
                .findUserById(model.userId)
                .then(renderUser, userError);
        }

        init();

        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(function () {
                    $location.url('/');
                }, function () {
                    model.error = "Unable to unregister you";
                });
        }
        function updateUser(user) {
            userService
                .updateUser(user._id, user)
                .then(function () {
                    model.message = "User update was successful";
                })
        }

        function deleteBookmark(title)
        {
            userService
                .deleteBookmark(model.userId, title)
                .then(function () {
                    init();
                    model.message = "Bookmark Deleted";
                })
        }

        function unfollow(username) {
            userService
                .unfollow(model.userId, username)
                .then(function () {
                    init();
                    model.message = "Bookmark Deleted";
                })
        }
        function renderUser (user) {
            model.user = user;
        }

        function userError(error) {
            model.error = "User not found";
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }
    }
})();