/**
 * Created by Zion on 7/21/17.
 */
(function () {
    angular
        .module('WAM')
        .controller('searchController', searchController);

    function searchController($routeParams, $location, searchService, userService){
        var model = this;
        model.title = $routeParams['title'];
        model.userId = $routeParams['userId'];

        model.searchBook = searchBook;
        model.redirectSearch = redirectSearch;
        model.redirectPeople = redirectPeople;

        function redirectPeople() {
            if (typeof(model.userId) === 'undefined')
                $location.url('/user/people');
            else
                $location.url('/user/' + model.userId + '/people/')
        }

        function redirectSearch(title) {
            if (typeof(model.userId) === 'undefined')
                $location.url('/search/' + title);
            else
                $location.url('/user/' + model.userId + '/search/' +title)
        }



        function init() {
            if (typeof(model.userId) === 'undefined')
                model.admin = -1;
            else {
                userService
                    .findUserById(model.userId)
                    .then(function (user) {
                        model.admin = user.roles.indexOf("ADMIN");
                    })
            }
            searchBook(model.title);

        }

        init();

        function searchBook(title)
        {
            searchService
                .searchBook(title)
                .then(function (result) {
                    // console.log(result.GoodreadsResponse.search[0].results[0].work[0]);
                    model.books = result.items;
                })
        }

    }
})();