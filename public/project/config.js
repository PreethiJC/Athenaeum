(function () {
    angular
        .module('WAM')
        .config(configuration);

    function configuration($routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'views/user/templates/home.view.client.html',
                controller: 'bestSellerController',
                controllerAs: 'model'

            })
            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            // .when('/profile', {
            //     templateUrl: 'views/user/templates/profile.view.client.html',
            //     controller: 'profileController',
            //     controllerAs: 'model'
            // })
            .when('/register', {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when('/user/',{
                templateUrl: 'views/user/templates/home.view.client.html',
                controller: 'bestSellerController',
                controllerAs: 'model'
            })
            .when('/user/:userId', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model'
            })
            .when('/search/:title', {
                templateUrl: 'views/user/templates/search.view.client.html',
                controller: 'searchController',
                controllerAs: 'model'
            })
            .when('/user/:userId/search/:title', {
                templateUrl: 'views/user/templates/search.view.client.html',
                controller: 'searchController',
                controllerAs: 'model'
            })
            .when('/user/:userId/people/', {
                templateUrl: 'views/user/templates/people.view.client.html',
                controller: 'peopleController',
                controllerAs: 'model'
            })
    }
})();
