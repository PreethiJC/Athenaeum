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
        model.redirect = redirect;
        model.bookmark = bookmark;
        function redirect(title) {
            if (typeof(model.userId) === 'undefined')
                $location.url('/search/' + title);
            else
                $location.url('/user/' + model.userId + '/search/' +title)
        }
        function init() {
            searchBook(model.title);
        }
        init();
        function searchBook(title) {
            searchService
                .searchBook(title)
                .then(function (result) {
                    // console.log(result.GoodreadsResponse.search[0].results[0].work[0]);
                    model.books = result.items;
                })
        }

        function bookmark(title) {
            if (typeof(model.userId) === 'undefined')
                alert('Please login to bookmark.');
            else {
                userService
                    .findUserById(model.userId)
                    .then(function (user) {
                        user.bookmarked.push(title);
                        userService.updateUser(model.userId, user)
                            .then(function () {
                                alert("Bookmarked");
                            })

                    })

            }
        }

    }
})();