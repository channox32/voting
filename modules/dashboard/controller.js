(function(){
    angular.module("pnhs.voting.user",[])
    .config(function($routeProvider){
        $routeProvider.when('/add_user',{
            templateUrl : 'modules/dashboard/add_user.html',
            controller: 'UserCtrl'
        }).when('/dashboard',{
            templateUrl : 'modules/dashboard/index.html',
            controller : 'AdminCtrl',
            controllerAs : 'admin'
        });
    }).controller('UserCtrl',UserCtrl);
    
     UserCtrl.$inject = ['$scope','$rootScope','generalService'];
    
    function UserCtrl($scope,$rootScope,generalService){
        var _self = this;
            _self.userCredentials = {
                firstname: '',
                lastname: '',
                password : '',
                confirm : '',
                role : 0
            };
            _self.match = (_self.userCredentials.password === _self.userCredentials.confirm) ? true : false;

            $scope.$watch(function(){
                return _self.userCredentials.confirm;
            },function(newVal,oldVal){
                if(_self.userCredentials.password === newVal){
                    _self.match = true;
                }else{
                    _self.match = false;
                }
            });

            _self.insertUser = function (){
                var userInfo = _self.userCredentials;
                if(_self.match) {
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

            if(!$rootScope.$$phase){
                $rootScope.$apply();
            }
        }
}());


