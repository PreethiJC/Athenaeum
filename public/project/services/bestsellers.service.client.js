/**
 * Created by Zion on 8/4/17.
 */
(function()
{
    angular
        .module('WAM')
        .factory('bestSellerService', bestSellerService);
    function bestSellerService($http)
    {
        var api = {getBestSeller: getBestSeller};
        return api;

        function getBestSeller()
        {
            var url = 'https://www.googleapis.com/books/v1/volumes?q=mediator+inauthor:cabot&key=AIzaSyCgSKEdri_DRhHgtj7_oSfPbNlcQC5odiE';
            //var url = "https://api.nytimes.com/svc/books/v3/reviews.json?api-key=44704081da8c485e9a20847fa3bbf63f&author=Isaac%20Asimov";
            return $http.get(url)
                .then(function(response, err)
                    {
                        //console.log(response.data);
                         return response.data;
                     });
        }
    }
}
)();