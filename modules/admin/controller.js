(function (){
 'use strict';
angular.module("pnhs.voting.admin",[])

.config(function($routeProvider){
    $routeProvider.when('/admin',{
       templateUrl : 'modules/admin/index.html',
        controller: 'AdminCtrl'
    });
}).controller('AdminCtrl',['$scope','generalService', function($scope,generalService,auth){
        $scope.adminCredential = {};
        $scope.adminInfo = {};
        $scope.tab = 'basic';
        $scope.statistics = {
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

        $scope.candidateList = {
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

        $scope.position = [
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
        $scope.status = 'Not Available';
        $scope.option = 'off';
        $scope.showResult = '';
        $scope.loginError = false;
        $scope.resultPanel = '';
        $scope.userList = [];
        $scope.password = '';
        $scope.confirmPass = '';
        $scope.candidateArray = [];
        $scope.page = 1;

        $scope.changeTab = function(tab){
            if(tab === 'additional' || tab==='result'){
                document.getElementById('pagination').innerHTML = '';
                $scope.getAllStudents();   
            }
            $scope.tab = tab;
        };

        $scope.setAdmin = function(id){
            $scope.currentID = id;
        };

        $scope.changePass = function(){
            if($scope.password === $scope.confirmPass){
                var data = {
                    admin_id : $scope.currentID || '',
                    password : $scope.confirmPass
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
                $scope.password = '';
                $scope.confirmPass = '';
            }
        };


        $scope.loginAdmin = function() {
            swal({title: "Please Wait...",   text: "Checking credential...",   timer: 1000,   showConfirmButton: false });
            if(typeof $scope.adminCredential !== 'undefined' || typeof $scope.adminCredential === 'object') {
              generalService.loginAdmin($scope.adminCredential,{
                success : function (response){
                    $scope.adminInfo = response;
                    generalService.isLoggedIn = (typeof response === 'object') ? true : false;
                    generalService._storageHandler().userId = response.admin_id;
                    $scope.userList = $scope.getAllUser();
                    generalService.redirect('dashboard');

                },
                error : function(error) {
                    swal("Oops!", "Incorrect Email or Password! Please Try Again!","error");
                    $scope.adminCredential.password = '';
                }
              });
            }
        };

        $scope.logout = function() {
            swal({title: "Please Wait...",   text: "Signing out...",   timer: 1000,   showConfirmButton: false });
            generalService.isLoggedIn = false;
            $scope.adminInfo = {};
            sessionStorage.clear();
            localStorage.clear();
        };

        $scope.calculatePercentage = function() {
            var base = eval($scope.statistics.length/10),
                percentage;
            for(var position in $scope.candidateList){
                for(var i = 0; i < $scope.candidateList[position].length;i++){
                    percentage = (($scope.candidateList[position][i].votes / base)*10).toFixed(2);
                    $scope.candidateList[position][i].percentage = parseFloat(percentage,10);
                }
            }  
        };

        $scope.getAllVotes = function(){
            generalService.getAllVotes({
                success : function(votes){
                    $scope.votes = votes.length;
                    for(var i =0;i<votes.length;i++){
                        for(var position in votes[i]){
                            if($scope.candidateList[position]){
                                for(var j = 0;j < $scope.candidateList[position].length;j++){
                                    if($scope.candidateList[position][j].fullname === votes[i][position]){
                                        $scope.candidateList[position][j].votes++;
                                    }
                                }
                            }
                        }
                    }
                    $scope.statistics = votes || []; 
                    $scope.calculatePercentage();
                },
                error : function(msg){
                    swal("Error!," + msg + ",error");
                    console.log(msg);
                }
            });
        };

        $scope.deleteUser = function(userId){
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
                                $scope.userList = [];
                            }
                            setTimeout(function(){
                                $scope.userList = $scope.getAllUser();
                            },100);
                        },
                        error : function(errorLog){
                            swal("Error!",errorLog,"error");
                        }
                    });
                    
                }
            });
        };


        // setInterval(function(){
        //     for(var position in $scope.candidateList){
        //         for(var i = 0; i < $scope.candidateList[position].length;i++){
        //             $scope.candidateList[position][i].votes = 0;
        //         }
        //     }
        //     $scope.statistics = [];
        //     $scope.getAllVotes();
        // },5000);

         generalService.getCandidateInfo({
                success : function(candidateInfo){
                    candidateInfo.forEach(function(entry){
                        $scope.candidateArray.push(entry);
                        switch(entry.position) {
                            case 'president' :
                                $scope.candidateList.president.push({fullname:entry.fullname,votes : 0,position: entry.position});
                                break;
                            case 'vice_president' : 
                                $scope.candidateList.vice_president.push({fullname:entry.fullname,votes : 0,position: entry.position});
                                break;
                            case 'secretary': 
                                $scope.candidateList.secretary.push({fullname:entry.fullname,votes : 0,position: entry.position});
                                 break;
                            case 'treasurer' :
                                $scope.candidateList.treasurer.push({fullname:entry.fullname,votes : 0,position: entry.position});
                            case 'pio':
                                $scope.candidateList.pio.push({fullname:entry.fullname,votes : 0,position: entry.position});
                                break;
                            case 'auditor':
                                $scope.candidateList.auditor.push({fullname:entry.fullname,votes : 0,position: entry.position});
                                break;
                            case 'fourth':
                                $scope.candidateList.fourth.push({fullname:entry.fullname,votes : 0,position: entry.position});
                                break;
                            case 'third':
                                $scope.candidateList.third.push({fullname:entry.fullname,votes : 0,position: entry.position});
                                break;
                            case 'second':
                                $scope.candidateList.second.push({fullname:entry.fullname,votes : 0,position: entry.position});
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

        $scope.pagination = function(){
            var availablePage = Math.ceil($scope.studentList.length / 10),paginationControl = $('#pagination');
            paginationControl.append('<button class="btn btn-default btn-sm" data-ng-disabled="page<=1" data-ng-click="changePage(\'prev\')">Prev</button>&nbsp;')
            for(var i = 1; i <= availablePage;i++){
                paginationControl.append('<button class="btn btn-default btn-sm" data-ng-click="changePage('+ i + ')">'+ i +'</button>&nbsp;');    
            }
            paginationControl.append('<button class="btn btn-default btn-sm" data-ng-click="changePage(\'next\')">Next</button>')
        };

        $scope.changePage = function(page){
            // switch(page){
            //     case 'prev' :
            //       $scope.page--;
            //       break;
            //     default :
            //       console.log(page);
            //       break;
            // }
            alert(page);
        };

        $scope.getAllStudents = function(){
            $scope.studentList = [];
            generalService.getAllStudents({
                success: function(list){
                    $scope.students = list.length;
                    var newDate = new Date();
                    for(var i = 0 ; i < list.length;i++){
                       newDate = new Date(list[i].date);
                       list[i].date = newDate.toDateString() + ' ' + newDate.getHours() + ':' + newDate.getMinutes() + ':' + newDate.getSeconds();
                       $scope.studentList.push(list[i]);
                    }
                       $scope.pagination();
                },  
                error : function(errorLog){
                    swal("Error!", errorLog, "error");
                }
            })
        };

        $scope.getAllUser = function(){
            generalService.getAllUser({
                success : function(userList){
                    for(var i = 0 ; i < userList.length;i++){
                        if(userList[i].admin_id != generalService._storageHandler().userId){
                            $scope.userList.push(userList[i]);
                        } 
                    }
                },  
                error : function(error){
                    swal("Oops!",error,"error");
                }
            });
            return $scope.userList;
        };

        // Watchers

/*        $scope.$watch(function(){
            return $scope.option;
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
                            $scope.adminInfo = details;
                            $scope.getAllVotes();
                            $scope.userList = $scope.getAllUser();
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
}]);
    
}());


