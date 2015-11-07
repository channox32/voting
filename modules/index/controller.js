(function(){
 angular.module("pnhs.voting.index",[])
    .config(function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'modules/index/basic.html',
            controller: 'IndexCtrl'
        }).when('/notfound', {
            templateUrl: 'modules/index/pagenotfound.html',
            controller: 'IndexCtrl'
        }).otherwise({
            redirectTo: '/notfound'
        });
    }).controller('IndexCtrl', ['$scope', 'generalService',
        function($scope, generalService) {
        }
    ]);


}());
