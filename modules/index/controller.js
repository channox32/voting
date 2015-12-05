(function(){
 angular.module("pnhs.voting.index",[])
    .config(function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'modules/index/basic.html',
            controller: 'IndexCtrl',
            controllerAs : 'index'
        }).when('/notfound', {
            templateUrl: 'modules/index/pagenotfound.html'
        }).otherwise({
            redirectTo: '/notfound'
        });
    }).controller('IndexCtrl', IndexCtrl);
    
    IndexCtrl.$inject = ['$scope','$rootScope'];
    
    function IndexCtrl($scope,$rootScope){
        var _self = this;
    }


}());
