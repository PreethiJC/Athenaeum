/**
 * Created by Zion on 8/4/17.
 */
(function () {
    angular
        .module('WAM')
        .controller('bestSellerController', bestSellerController);

    function bestSellerController($location, bestSellerService){
        var model = this;
        model.redirect = redirect;
        function redirect(title) {
            $location.url('/search/' + title);
        }
        // model.getBestSeller = getBestSeller;
        // model.searchBookByID = searchBookByID;
        // function init()
        // {
        //     res = getBestSeller();
        //
        // }
        // init();
        // function getBestSeller() {
        //     bestSellerService
        //         .getBestSeller()
        //         .then(function (result) {
        //             // return result
        //             // console.log(result)
        //             model.bestSellers = result.items;
        //             // model.bookImg = result.items[0].volumeInfo.imageLinks.smallThumbnail;
        //             // model.title = result.items[0].volumeInfo.title;
        //             // model.author = result.items[0].volumeInfo.authors[0];
        //         })
        // }
        //
        // function searchBookByID(id) {
        //     searchService
        //         .searchBookByID(id)
        //         .then(function (result) {
        //             console.log(result);
        //         })
        // }
    }
})();