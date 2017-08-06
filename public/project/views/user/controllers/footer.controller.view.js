/**
 * Created by Zion on 8/5/17.
 */
(function () {
    angular
        .module("WAM")
        .controller("footerController", footerController);
    function footerController($routeParams) {

        var footerCtrl = this;

        footerCtrl.userId = $routeParams.userId;


    }
})();