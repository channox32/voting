var students = angular.module("pnhs.voting.student",[]);

students.config(function($routeProvider){
    $routeProvider.when('/students',{
        templateUrl : 'modules/students/index.html',
        controller : 'StudentCtrl'
    });
});

students.controller('StudentCtrl',['$scope','generalService', function($scope, generalService){
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