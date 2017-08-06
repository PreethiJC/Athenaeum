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
            var url = "https://www.googleapis.com/books/v1/volumes?q=" + title + "&key=AIzaSyCgSKEdri_DRhHgtj7_oSfPbNlcQC5odiE";
            return $http.get(url)
                .then(function (response) {
                    // console.log(response.data);
                    return response.data;
                });
            // var url = "/api/project/book/"+title;
            // return $http.get(url)
            //     .then(function (response) {
            //         return response.data;
            //     });
        }

        function searchBookByID(id) {
            var url = "https://www.goodreads.com/book/show/" + id + ".xml?key=T3XmyOG438rZNaDB6kTcHQ";
            return $http.get(url)
                .then(function (response) {
                    console.log(response)
                });
        }
    }

})();
