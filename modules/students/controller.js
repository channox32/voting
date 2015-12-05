(function(){
angular.module("pnhs.voting.student",[])
.config(function($routeProvider){
    $routeProvider.when('/students',{
        templateUrl : 'modules/students/index.html',
        controller : 'StudentCtrl',
        controllerAs: 'student'
    });
}).controller('StudentCtrl',StudentCtrl);
    
StudentCtrl.$inject = ['$scope','$rootScope','generalService'];
function StudentCtrl($scope,$rootScope, generalService){
        var _self = this;
        _self.currentPage = generalService.currentPage ? generalService.currentPage : 'registration';
        _self.cStep = 1;
        _self.lrnCheck = function(){
            if(_self.studentData.lrn.match(/[A-Za-z]/g) === null){
                _self.invalidLRN = false;
            }else{
                _self.invalidLRN = true;
            }
        }
        _self.studentData = {
            lrn : '',
            firstname : '',
            lastname : '',
            middlename : '',
            gender : '',
            yearlevel : '7',
            section : 'Ampere'
        };
        _self.bdate = {
            month : 'January',
            date : '1',
            year: '2000'
        };
        _self.monthList = [
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

        _self.candidateData = {
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

        
        _self.candidate = {};

        _self.candidateInfo = {
            'name' : '',
            'year' : '',
            'motto' : ''
        };
        _self.sectionList = [];
        _self.errorMessage = '';
        _self.errorPopup = false;
        _self.partyList = [];
        _self.members = [];

        _self.days = function(){
            var days = [];
            for(var i = 1; i <= 31; i++){
                days.push(i);
            }
            return days;
        }
        
        _self.year = function(){
            var year = [];
            for(var i = 1990; i < new Date().getFullYear(); i++) {
                year.push(i);
            }
            return year;
        };

        _self.registerStudent = function(){
            _self.studentData.birthdate = _self.bdate.month + _self.bdate.date + _self.bdate.year;
            generalService.studentExists({lrn : _self.studentData.lrn},{
                success : function(){
                        generalService.registerStudent(_self.studentData,{
                            success : function(data){
                                swal("Good job!", "You're account successfully saved!", "success");
                                _self.currentPage = 'choose';
                                generalService._storageHandler().page = _self.currentPage;
                                generalService.currentPage = _self.currentPage;
                                generalService._storageHandler().registerId = data;
                                _self.cStep += 32;
                            },
                            error : function(error){
                                _self.errorMessage = error;
                                swal("Oops!", "Something went wrong!" + _self.errorMessage + "," +  "error");
                            }
                        });
                },
                error : function(){
                    swal("Error","You can only vote once. Failed to register!","error");
                }
            })
        };
        _self.getPartyInfo = function(id){
            _self.options = true;
            _self.platform = false;
            _self.members = [];
            for(var i = 0; i < _self.partyList.length;i++){
                if(_self.partyList[i].party_id === id){
                    _self.partyFlag = _self.partyList[i];
                }
            }
        }

        _self.getListMembers = function(){
            _self.members = [];
            _self.hashes = [];
                for(var position in _self.candidateData){
                    _self.candidateData[position].forEach(function(entry){
                            if(entry.party_id === _self.partyFlag.party_id){
                                //if(_self.hashes.indexOf(entry.$$hashKey) < 0){
                                    _self.members.push(entry);
                                   // _self.hashes.push(entry.$$hashKey);
                                    _self.candidate[entry.position] = entry.fullname;
                                //}
                            }
                    });
                }
        }


        _self.vote = function(option) {
            _self.currentPage = option;
            generalService._storageHandler().page = _self.currentPage;
            generalService.currentPage = _self.currentPage;
            _self.cStep += 5;
            if(option === 'party'){
                generalService.getAllParties({
                    success : function(data){
                        _self.partyList = data.parties;
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
                                _self.candidateData.president.push(entry);
                                break;
                            case 'vice_president' : 
                                _self.candidateData.vice_president.push(entry);
                                break;
                            case 'secretary': 
                                _self.candidateData.secretary.push(entry);
                                 break;
                            case 'treasurer' :
                                _self.candidateData.treasurer.push(entry);
                            case 'pio':
                                _self.candidateData.pio.push(entry);
                                break;
                            case 'auditor':
                                _self.candidateData.auditor.push(entry);
                                break;
                            case 'fourth':
                                _self.candidateData.fourth.push(entry);
                                break;
                            case 'third':
                                _self.candidateData.third.push(entry);
                                break;
                            case 'second':
                                _self.candidateData.second.push(entry);
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

        _self.candidateVote = function(){
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
                            _self.candidate.voters_id = generalService._storageHandler().registerId; 
                            generalService.voteCandidates(_self.candidate,{
                                success : function(response){
                                    if(response.result === 'success'){
                                        _self.currentPage = 'finalize';   
                                        generalService._storageHandler().page = _self.currentPage;
                                        generalService.currentPage = _self.currentPage;
                                        _self.cStep += 100 - _self.cStep;
                                    }
                                },
                                error : function(errorLog){
                                    console.log(errorLog);
                                }
                            });
                        }
                });
        };


        _self.getCandidateDetails = function(name,position){
            for(var i = 0 ; i < _self.candidateData[position].length;i++){
                if(_self.candidateData[position][i].fullname === name){
                    _self.candidateInfo = _self.candidateData[position][i];
                }
            }
        };

        _self.why = function(){
            swal({title: "Why?",   text: "Some message here!",   imageUrl: "img/question.jpg" });
        };

        _self.verify = function(){
            if(_self.passcode){
                generalService.verification(_self.passcode,{
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
                        _self.passcode = '';
                    }
                })
            }else{
                swal('Oops!',"Please supply a valid PASSCODE!",'warning');
            }
        }

        // Watchers

        $scope.$watch(function(){
            return _self.studentData.yearlevel;
        },function(newValue,oldValue){
            if(newValue){
                switch(newValue.toString()){
                    case '7':
                        _self.sectionList = [
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
                        _self.sectionList = [
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
                        _self.sectionList = [
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
}

}());

 
