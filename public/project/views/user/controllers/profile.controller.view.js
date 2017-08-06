(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);

    function profileController($location, $routeParams, userService) {

        var model = this;

        model.userId = $routeParams['userId'];

        model.user = userService.findUserById(model.userId);

        model.redirect = redirect;

        function redirect(title) {
            $location.url('user/' + model.userId +'/search/' + title);
        }
    }
})();