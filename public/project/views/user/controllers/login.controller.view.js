(function () {
    angular
        .module('WAM')
        .controller('loginController', loginController);

    function loginController($location, userService) {
        console.log($location);
        var model = this;

        model.login = login;

        function login(username, password) {
            var found = userService.findUserByCredentials(username, password);

            if(found !== null) {
                $location.url('/user/' + found._id);// + found._id);
            } else {
                model.message = "sorry, " + username + " not found. please try again!";
            }
        }
    }
})();