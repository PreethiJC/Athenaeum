/**
 * Created by Zion on 7/21/17.
 */

(function() {
    angular
        .module('WAM')
        .factory('searchService', searchService);
    function searchService($http) {
        var api = {
            searchBook: searchBook,
            searchBookByID: searchBookByID
        };
        return api;
        function searchBook(title) {
            var url = "https://www.googleapis.com/books/v1/volumes?q=" + title + "&key=" + process.env.API_KEY;
            return $http.get(url)
                .then(function (response) {
                    // console.log(response.data);
                    return response.data;
                });
        }

        function searchBookByID(id) {
            var url = "https://www.googleapis.com/books/v1/volumes/" +id;
            return $http.get(url)
                .then(function (response) {
                    // console.log(response.data);
                    return response.data;
                });
        }
    }

})();
