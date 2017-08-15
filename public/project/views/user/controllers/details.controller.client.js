/**
 * Created by Zion on 8/15/17.
 */
/**
 * Created by Zion on 7/21/17.
 */
(function () {
    angular
        .module('WAM')
        .controller('detailsController', detailsController);

    function detailsController($routeParams, $location, searchService, userService){
        var model = this;
        model.volumeId = $routeParams['volumeId'];
        model.userId = $routeParams['userId'];

        model.searchBookById = searchBookById;
        model.redirectSearch = redirectSearch;
        model.bookmark = bookmark;
        model.addBookshelf = addBookshelf;
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
            searchBookById(model.volumeId);

        }
        init();

        function searchBookById(volumeId) {
            searchService
                .searchBookByID(volumeId)
                .then(function (result) {
                    // console.log(result.GoodreadsResponse.search[0].results[0].work[0]);
                    model.book = result;
                })
        }

        function bookmark(title) {
            if (typeof(model.userId) === 'undefined')
                alert('Please login to bookmark.');
            else {
                userService
                    .findUserById(model.userId)
                    .then(function (user) {
                        var bm = {volId: model.volumeId, bookName: title};
                        user.bookmarked.push(bm);
                        userService.updateUser(model.userId, user)
                            .then(function () {
                                alert("Bookmarked");
                            })

                    })

            }
        }

        function addBookshelf(title) {
            if (typeof(model.userId) === 'undefined')
                alert('Please login to access bookshelves.');
            else {
                userService
                    .findUserById(model.userId)
                    .then(function (user) {
                        var book = {volId: model.volumeId, bookName: title};
                        user.bookshelf.push(book);
                        userService.updateUser(model.userId, user)
                            .then(function () {
                                alert("Added to Bookshelf");
                            })

                    })

            }
        }

    }
})();