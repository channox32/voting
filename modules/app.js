<<<<<<< HEAD
/*global angular*/
(function (){
    'use strict';
angular.module('VoteApp', [
    'ngRoute',
    'pnhs.voting.student',
    'pnhs.voting.admin',
    'pnhs.voting.user',
    'pnhs.voting.index'
   ]);

}());
=======
var voteApp = angular.module('VoteApp', ['ngRoute']);

voteApp.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'modules/index/basic.html',
        controller: 'IndexCtrl'
    }).when('/notfound', {
        templateUrl: 'modules/index/pagenotfound.html',
        controller: 'IndexCtrl'
    }).when('/students',{
        templateUrl : 'modules/students/index.html',
        controller : 'StudentCtrl'
    }).when('/admin',{
        templateUrl : 'modules/admin/index.html',
        controller: 'AdminCtrl'
    }).when('/dashboard',{
        templateUrl : 'modules/dashboard/index.html',
        controller: 'AdminCtrl'
    }).when('/add_user',{
        templateUrl : 'modules/dashboard/add_user.html',
        controller: 'UserCtrl'
    }).otherwise({
        redirectTo: '/notfound'
    });
});

voteApp.controller('MainController', ['$scope',
    function($scope) {
        $scope.welcome = "Welcome";
    }
]);

voteApp.controller('UserCtrl',['$scope','generalService',function($scope,generalService){
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

voteApp.controller('IndexCtrl', ['$scope', 'generalService',
    function($scope, generalService) {


    }
]);

voteApp.controller('AdminCtrl',['$scope','generalService', function($scope,generalService,auth){
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

        $scope.calculatePercentage = function(){
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


        //---------------------------------------------------------------------------------//
        //                                                                                 //
        //                             STUDENT CONTROLLER                                  //
        //--------------------------------------------------------------------------------//


voteApp.controller('StudentCtrl',['$scope','generalService', function($scope, generalService){
        $scope.currentPage = generalService.currentPage ? generalService.currentPage : 'registration';
        $scope.cStep = 1;
        $scope.lrnCheck = function(){
            if($scope.studentData.lrn.match(/[A-Za-z]/g) === null){
                $scope.invalidLRN = false;
            }else{
                $scope.invalidLRN = true;
            }
        }
        $scope.studentData = {
            lrn : '',
            firstname : '',
            lastname : '',
            middlename : '',
            gender : '',
            yearlevel : '7',
            section : 'Ampere'
        };
        $scope.bdate = {
            month : 'January',
            date : '1',
            year: '2000'
        };
        $scope.monthList = [
            { month : 'January'},
            {month : 'February'},
            {month : 'March'},
            {month : 'April'},
            {month : 'May'},
            {month : 'June'},
            {month : 'July'},
            {month : 'August'},
            {month : 'September'},
            {month : 'October'},
            {month : 'November'},
            {month : 'December '}
        ];

        $scope.candidateData = {
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

        
        $scope.candidate = {};

        $scope.candidateInfo = {
            'name' : '',
            'year' : '',
            'motto' : ''
        };
        $scope.sectionList = [];
        $scope.errorMessage = '';
        $scope.errorPopup = false;
        $scope.partyList = [];
        $scope.members = [];

        $scope.days = function(){
            var days = [];
            for(var i = 1; i <= 31; i++){
                days.push(i);
            }
            return days;
        }
        
        $scope.year = function(){
            var year = [];
            for(var i = 1990; i < new Date().getFullYear(); i++) {
                year.push(i);
            }
            return year;
        };

        $scope.registerStudent = function(){
            $scope.studentData.birthdate = $scope.bdate.month + $scope.bdate.date + $scope.bdate.year;
            generalService.studentExists({lrn : $scope.studentData.lrn},{
                success : function(){
                        generalService.registerStudent($scope.studentData,{
                            success : function(data){
                                swal("Good job!", "You're account successfully saved!", "success");
                                $scope.currentPage = 'choose';
                                generalService._storageHandler().page = $scope.currentPage;
                                generalService.currentPage = $scope.currentPage;
                                generalService._storageHandler().registerId = data;
                                $scope.cStep += 32;
                            },
                            error : function(error){
                                $scope.errorMessage = error;
                                swal("Oops!", "Something went wrong!" + $scope.errorMessage + "," +  "error");
                            }
                        });
                },
                error : function(){
                    swal("Error","You can only vote once. Failed to register!","error");
                }
            })
        };
        $scope.getPartyInfo = function(id){
            $scope.options = true;
            $scope.platform = false;
            $scope.members = [];
            for(var i = 0; i < $scope.partyList.length;i++){
                if($scope.partyList[i].party_id === id){
                    $scope.partyFlag = $scope.partyList[i];
                }
            }
        }

        $scope.getListMembers = function(){
            $scope.members = [];
            $scope.hashes = [];
                for(var position in $scope.candidateData){
                    $scope.candidateData[position].forEach(function(entry){
                            if(entry.party_id === $scope.partyFlag.party_id){
                                //if($scope.hashes.indexOf(entry.$$hashKey) < 0){
                                    $scope.members.push(entry);
                                   // $scope.hashes.push(entry.$$hashKey);
                                    $scope.candidate[entry.position] = entry.fullname;
                                //}
                            }
                    });
                }
        }


        $scope.vote = function(option) {
            $scope.currentPage = option;
            generalService._storageHandler().page = $scope.currentPage;
            generalService.currentPage = $scope.currentPage;
            $scope.cStep += 5;
            if(option === 'party'){
                generalService.getAllParties({
                    success : function(data){
                        $scope.partyList = data.parties;
                    },
                    error : function(errorLog){
                        swal("Error!",errorlog,"warning");
                    }
                });
            }
            generalService.getCandidateInfo({
                success : function(candidateInfo){
                    candidateInfo.forEach(function(entry){
                        switch(entry.position) {
                            case 'president' :
                                $scope.candidateData.president.push(entry);
                                break;
                            case 'vice_president' : 
                                $scope.candidateData.vice_president.push(entry);
                                break;
                            case 'secretary': 
                                $scope.candidateData.secretary.push(entry);
                                 break;
                            case 'treasurer' :
                                $scope.candidateData.treasurer.push(entry);
                            case 'pio':
                                $scope.candidateData.pio.push(entry);
                                break;
                            case 'auditor':
                                $scope.candidateData.auditor.push(entry);
                                break;
                            case 'fourth':
                                $scope.candidateData.fourth.push(entry);
                                break;
                            case 'third':
                                $scope.candidateData.third.push(entry);
                                break;
                            case 'second':
                                $scope.candidateData.second.push(entry);
                                break;
                            default :
                                console.log("Error");
                                break;
                        }
                    });
                },
                error : function (errorLog) {
                    swal("Oops!" + errorLog + ",error");
                }

            });
        };

        $scope.candidateVote = function(){
            swal({
                title: "Finalize Vote?",
                text: "You cannot vote again, ensure that this is already final!",
                type: "warning",   
                showCancelButton: true,  
                confirmButtonColor: "#DD6B55",  
                confirmButtonText: "Yes",   
                cancelButtonText: "No",  
                closeOnConfirm: true,
                closeOnCancel: true 
                }, function(isConfirm){ 
                     if (isConfirm) {   
                            $scope.candidate.voters_id = generalService._storageHandler().registerId; 
                            generalService.voteCandidates($scope.candidate,{
                                success : function(response){
                                    if(response.result === 'success'){
                                        $scope.currentPage = 'finalize';   
                                        generalService._storageHandler().page = $scope.currentPage;
                                        generalService.currentPage = $scope.currentPage;
                                        $scope.cStep += 100 - $scope.cStep;
                                    }
                                },
                                error : function(errorLog){
                                    console.log(errorLog);
                                }
                            });
                        }
                });
        };


        $scope.getCandidateDetails = function(name,position){
            for(var i = 0 ; i < $scope.candidateData[position].length;i++){
                if($scope.candidateData[position][i].fullname === name){
                    $scope.candidateInfo = $scope.candidateData[position][i];
                }
            }
        };

        $scope.why = function(){
            swal({title: "Why?",   text: "Some message here!",   imageUrl: "img/question.jpg" });
        };

        $scope.verify = function(){
            if($scope.passcode){
                generalService.verification($scope.passcode,{
                    success : function(response){
                        generalService._storageHandler().clear();
                        swal({
                            title : "Success",
                            text : "Vote was successfull counted!",
                            timer: 2000,
                            closeOnConfirm : false,
                            showConfirmButton : true,
                            showLoaderOnConfirm : true,
                        });
                        setTimeout(function(){
                            window.location.reload();
                        },2100);
                    },
                    error : function (errorLog){
                        swal('Snap!',errorLog,"error");
                        $scope.passcode = '';
                    }
                })
            }else{
                swal('Oops!',"Please supply a valid PASSCODE!",'warning');
            }
        }

        // Watchers

        $scope.$watch(function(){
            return $scope.studentData.yearlevel;
        },function(newValue,oldValue){
            if(newValue){
                switch(newValue.toString()){
                    case '7':
                        $scope.sectionList = [
                               'Ampere',
                               'Archimedes ',
                               'Aristotle ',
                               'Diophantus ',
                               'Napier ',
                               'Newton ',
                               'Pythagoras ',
                               'Socrates ',
                               'Tesla ',
                               'Thales '
                        ]; 
                        break;
                    case '8':
                        $scope.sectionList = [
                                'Bernoulli',
                                'Darwin',
                                'Fleming',
                                'Keppler',
                                'Galilei',
                                'Hawking',
                                'Jenner',
                                'Mendel',
                                'Nobel',
                                'Pasteur'
                        ];
                        break;
                    case '9':
                        $scope.sectionList = [
                            'Copernicus',
                            'Curie',
                            'Dalton',
                            'Da Vinci',
                            'Democritus',
                            'Edison',
                            'Faraday',
                            'Pascal',
                            'Torricelli'
                        ];
                        break;
                    default : 
                        return;
                }
            }
        });
}]);
>>>>>>> c6b9c50ee664670558690709449185aef7b9b973
