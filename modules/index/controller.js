var index = angular.module("pnhs.voting.index",[]);

index.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'modules/index/basic.html',
        controller: 'IndexCtrl'
    }).when('/notfound', {
        templateUrl: 'modules/index/pagenotfound.html',
        controller: 'IndexCtrl'
    }).otherwise({
        redirectTo: '/notfound'
    });
});



index.controller('IndexCtrl', ['$scope', 'generalService',
    function($scope, generalService) {


    }
]);
