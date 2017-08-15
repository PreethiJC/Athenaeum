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
        model.redirectSearch = redirectSearch;
        model.followUser = followUser;
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
        function init()
        {
            userService.findAllUsers(model.userId).then(
                function (uIDs) {
                    model.users = uIDs
                }
            );
            userService.findUserById(model.userId).then(
                function (user) {
                    model.currentUser = user;
                }
            )
            // console.log(model.users);
        }
        init();

        function followUser(username)
        {
            if (typeof(model.userId) === 'undefined')
                alert('Please login to follow this user.');
            else {
                userService.findUserById(model.userId).then(function (user) {
                   var follower = user;
                    follower.following.push(username);
                    userService
                        .updateUser(model.userId, follower);
                    model.users.forEach(function (leader) {
                        if (leader.username === username)
                        {
                            leader.followedBy.push(follower.username);
                            userService
                                    .updateUser(leader._id, leader);
                        }
                    });
                    alert("You are now following " + username);
                })
                }




        }
    }
})();