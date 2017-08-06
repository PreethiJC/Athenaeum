/**
 * Created by Zion on 8/5/17.
 */
(function () {
    angular
        .module('WAM')
        .controller('peopleController', peopleController);

    function peopleController($routeParams, $location, userService){
        var model = this;
        model.title = $routeParams['title'];
        model.userId = $routeParams['userId'];
        model.redirect = redirect;
        model.followUser = followUser;

        function redirect(title) {
            if (typeof(model.userId) === 'undefined')
                $location.url('/search/' + title);
            else
                $location.url('/user/' + model.userId + '/search/' +title)
        }
        function init() {
            model.users = userService.findAllUsers(model.userId);
            console.log(model.users);
        }
        init();

        function followUser(username)
        {
            if (typeof(model.userId) === 'undefined')
                alert('Please login to bookmark.');
            else {
                var follower = userService.findUserById(model.userId);
                var leader = userService.findUserByUsername(username);
                follower.follows.push(username);
                leader.followedBy.push(follower.username);
                userService
                    .updateUser(model.userId, follower);
                userService
                    .updateUser(leader._id, leader);
                alert("You are now following " + username);
            }


        }
    }
})();