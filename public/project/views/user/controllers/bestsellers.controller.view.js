/**
 * Created by Zion on 8/4/17.
 */
(function () {
    angular
        .module('WAM')
        .controller('bestSellerController', bestSellerController);

    function bestSellerController($location){
        var model = this;
        model.redirectSearch = redirectSearch;
        model.redirectPeople = redirectPeople;

        function redirectPeople() {
            $location.url('/user/people');
        }

        function redirectSearch(title) {
            $location.url('/search/' + title);
        }
    }
})();