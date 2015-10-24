var user = angular.module("pnhs.voting.user",[]);

user.config(function($routeProvider){
    $routeProvider.when('/add_user',{
        templateUrl : 'modules/dashboard/add_user.html',
        controller: 'UserCtrl'
    }).when('/dashboard',{
        templateUrl : 'modules/dashboard/index.html',
        controller : 'AdminCtrl'
    });
});


user.controller('UserCtrl',['$scope','generalService',function($scope,generalService){
    $scope.userCredentials = {
        firstname: '',
        lastname: '',
        password : '',
        confirm : '',
        role : 0
    };
    $scope.match = ($scope.userCredentials.password === $scope.userCredentials.confirm) ? true : false;
    
    $scope.$watch(function(){
        return $scope.userCredentials.confirm;
    },function(newVal,oldVal){
        if($scope.userCredentials.password === newVal){
            $scope.match = true;
        }else{
            $scope.match = false;
        }
    });

    $scope.insertUser = function (){
        var userInfo = $scope.userCredentials;
        if($scope.match) {
            userInfo.username = (userInfo.firstname.substr(0,1) + userInfo.lastname).toLowerCase();
            generalService.insertUser(userInfo,{
                success : function(data){
                    swal({
                        title: "Registering...",
                        text : "Executing your query...",
                        showConfirmButton : false,
                        closeOnConfirm : true,
                        timer : 1500
                    });
                    generalService.redirect('dashboard');
                },error : function (error){
                    swal("Error!",error,"error");
                }
            })
        }else{
            swal("Oops!","Password is invalid!","warning");
        }
    }


}]);
