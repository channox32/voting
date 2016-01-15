(function (){
 'use strict';
angular.module("pnhs.voting.admin",[])
 .config(function($routeProvider){
        $routeProvider.when('/admin',{
           templateUrl : 'modules/admin/index.html',
            controller: 'AdminCtrl',
            controllerAs : 'admin'
        });
})
.controller('AdminCtrl',AdminCtrl);

AdminCtrl.$inject = ['$scope','generalService'];
    
function AdminCtrl($scope,generalService){
    var _self = this;
_self.adminCredential = {};
        _self.adminInfo = {};
        _self.tab = 'basic';
        _self.statistics = {
            president : [],
            vice_president : [],
            secretary : [],
            treasurer : [],
            pio : [],
            auditor : [],
            fourth : [],
            third : [],
            second : []
        };

        _self.candidateList = {
            president : [],
            vice_president : [],
            secretary : [],
            treasurer : [],
            pio : [],
            auditor : [],
            fourth : [],
            third : [],
            second : []
        };

        _self.position = [
        "President",
        "Vice President",
        "Secretary",
        "Treasurer", 
        "PIO", 
        "Auditor", 
        "Fourth Year Rep.", 
        "Third Year Rep.", 
        "Second Year Rep."
        ];
        _self.status = 'Not Available';
        _self.option = 'off';
        _self.showResult = '';
        _self.loginError = false;
        _self.resultPanel = '';
        _self.userList = [];
        _self.password = '';
        _self.confirmPass = '';
        _self.candidateArray = [];
        _self.page = 1;

        _self.changeTab = function(tab){
            if(tab === 'additional'){
                _self.getAllStudents();   
            }
            _self.tab = tab;
        };

        _self.setAdmin = function(id){
            _self.currentID = id;
        };

        _self.changePass = function(){
            if(_self.password === _self.confirmPass){
                var data = {
                    admin_id : _self.currentID || '',
                    password : _self.confirmPass
                };

                generalService.changePass(data,{
                    success: function(response){
                        $('#close').trigger('click');
                        swal("Success","Password was successfully updated!","success");
                    }, error : function(errorLog){
                        swal("Ohw!","Something went wrong!","error");
                    }
                });
                
            }else{
                _self.password = '';
                _self.confirmPass = '';
            }
        };


        _self.loginAdmin = function() {
            console.log(performance.now());
            swal({title: "Please Wait...",   text: "Checking credential...",   timer: 1000,   showConfirmButton: false });
            if(typeof _self.adminCredential !== 'undefined' || typeof _self.adminCredential === 'object') {
              generalService.loginAdmin(_self.adminCredential,{
                success : function (response){
                    _self.adminInfo = response;
                    generalService.isLoggedIn = (typeof response === 'object') ? true : false;
                    generalService._storageHandler().userId = response.admin_id;
                    _self.userList = _self.getAllUser();
                    generalService.redirect('dashboard');
                    console.log(performance.now());
                },
                error : function(error) {
                    swal("Oops!", "Incorrect Email or Password! Please Try Again!","error");
                    _self.adminCredential.password = '';
                }
              });
            }
        };

        _self.logout = function() {
            swal({title: "Please Wait...",   text: "Signing out...",   timer: 1000,   showConfirmButton: false });
            generalService.isLoggedIn = false;
            _self.adminInfo = {};
            sessionStorage.clear();
            localStorage.clear();
        };

        _self.calculatePercentage = function() {
            var base = eval(_self.statistics.length/10),
                percentage;
            for(var position in _self.candidateList){
                for(var i = 0; i < _self.candidateList[position].length;i++){
                    percentage = ((_self.candidateList[position][i].votes / base)*10).toFixed(2);
                    _self.candidateList[position][i].percentage = parseFloat(percentage,10);
                }
            }  
        };

        _self.getAllVotes = function(){
            generalService.getAllVotes({
                success : function(votes){
                    _self.votes = votes.length;
                    for(var i =0;i<votes.length;i++){
                        for(var position in votes[i]){
                            if(_self.candidateList[position]){
                                for(var j = 0;j < _self.candidateList[position].length;j++){
                                    if(_self.candidateList[position][j].fullname === votes[i][position]){
                                        _self.candidateList[position][j].votes++;
                                    }
                                }
                            }
                        }
                    }
                    _self.statistics = votes || []; 
                    _self.calculatePercentage();
                },
                error : function(msg){
                    swal("Error!," + msg + ",error");
                    console.log(msg);
                }
            });
        };

        _self.deleteUser = function(userId){
            swal({
                title: "Delete User",
                text: "Are you sure you want to delete this user?",
                type: "warning",   
                showCancelButton: true,  
                confirmButtonColor: "#DD6B55",  
                confirmButtonText: "Yes",   
                cancelButtonText: "No",  
                closeOnConfirm: true,
                closeOnCancel: true
            },function(isConfirm){
                if(isConfirm){
                    generalService.deleteUser(userId,{
                        success : function(result){
                            if(result==='success'){
                                swal("Success","User was deleted successfully!","success");
                                _self.userList = [];
                            }
                            setTimeout(function(){
                                _self.userList = _self.getAllUser();
                            },100);
                        },
                        error : function(errorLog){
                            swal("Error!",errorLog,"error");
                        }
                    });
                    
                }
            });
        };

         generalService.getCandidateInfo({
                success : function(candidateInfo){
                    candidateInfo.forEach(function(entry){
                        _self.candidateArray.push(entry);
                        switch(entry.position) {
                            case 'president' :
                                _self.candidateList.president.push({fullname:entry.fullname,votes : 0,position: entry.position});
                                break;
                            case 'vice_president' : 
                                _self.candidateList.vice_president.push({fullname:entry.fullname,votes : 0,position: entry.position});
                                break;
                            case 'secretary': 
                                _self.candidateList.secretary.push({fullname:entry.fullname,votes : 0,position: entry.position});
                                 break;
                            case 'treasurer' :
                                _self.candidateList.treasurer.push({fullname:entry.fullname,votes : 0,position: entry.position});
                            case 'pio':
                                _self.candidateList.pio.push({fullname:entry.fullname,votes : 0,position: entry.position});
                                break;
                            case 'auditor':
                                _self.candidateList.auditor.push({fullname:entry.fullname,votes : 0,position: entry.position});
                                break;
                            case 'fourth':
                                _self.candidateList.fourth.push({fullname:entry.fullname,votes : 0,position: entry.position});
                                break;
                            case 'third':
                                _self.candidateList.third.push({fullname:entry.fullname,votes : 0,position: entry.position});
                                break;
                            case 'second':
                                _self.candidateList.second.push({fullname:entry.fullname,votes : 0,position: entry.position});
                                break;
                            default :
                                console.log("Error");
                                break;
                        }
                    });
                },
                error : function(errorLog){
                    swal("Oops!" + errorLog + ",error");
                }
        });


        _self.getAllStudents = function(){
            _self.studentList = [];
            generalService.getAllStudents({
                success: function(list){
                    var newDate,
                    studentsArr     = list.data,
                    studentLength   = list.data.length;

                    for(var i = 0 ; i < studentLength; i++){
                       newDate             = new Date(studentsArr[i].date);
                       studentsArr[i].date = newDate.toDateString() + ' ' + newDate.getHours() + ':' + newDate.getMinutes() + ':' + newDate.getSeconds();
                       _self.studentList.push(studentsArr[i]);
                    }
                      // _self.pagination();
                },  
                error : function(errorLog){
                    swal("Error!", errorLog, "error");
                }
            })
        };

        _self.getAllUser = function(){
            generalService.getAllUser({
                success : function(userList){
                    for(var i = 0 ; i < userList.length;i++){
                        if(userList[i].admin_id != generalService._storageHandler().userId){
                            _self.userList.push(userList[i]);
                        } 
                    }
                },  
                error : function(error){
                    swal("Oops!",error,"error");
                }
            });
            return _self.userList;
        };

        // Watchers

/*        _self.$watch(function(){
            return _self.option;
        },function(newVal,oldVal){
            generalService.setStatusPoll(newVal,{
                success: function(){
                    //
                },
                error : function(){

                }
            })
        });*/

        $scope.$watch(function(){
            return generalService.isLoggedIn;
        }, function(newValue, oldValue){
            if(!newValue){
                window.location.href = '#/admin';
            }else{
                if(generalService.isLoggedIn) {
                    generalService.getAdminDetails(generalService._storageHandler().userId,{
                        success: function(details){
                            _self.adminInfo = details;
                            _self.getAllVotes();
                            _self.userList = _self.getAllUser();
                            window.location.href = "#/dashboard";
                            //generalService.redirect('dashboard');
                        },
                        error: function(error){
                            console.log(error);
                        }
                    });
                }
            }
        });
}    
    
}());


