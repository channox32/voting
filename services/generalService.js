<<<<<<< HEAD
/*global angular*/

(function (){
    'use strict';
angular.module('VoteApp')
    .service('generalService', ['$http', '$window',
    function ($http, $window) {
        function generalService() {
            var _self = this;
            
            _self.isLoggedIn = sessionStorage.userId ? true : false;

            _self.redirect = function (page){
                if (page) {
=======
var voteApp = angular.module('VoteApp');

voteApp.service('generalService', ['$http', '$window',
    function($http, $window) {
        return {
            
            isLoggedIn : sessionStorage.userId ? true : false,

            redirect : function(page){
                if(page){
>>>>>>> c6b9c50ee664670558690709449185aef7b9b973
                    $window.location.href = '#' + page;
                }else{
                    $window.location.href = "#/"
                }
<<<<<<< HEAD
            }
            
            _self.currentPage = sessionStorage.page ? sessionStorage.page : 'registration';
            
            _self.apiRef = function () {
                return $window.location.origin + window.location.pathname + 'api/';
            }
            _self._storageHandler = function() {
                return sessionStorage;
            }

            _self.studentExists = function(data,callback){
                $http.post(_self.apiRef() + 'studentExists',data)
                .then(function(response){
                    if (response.data.result === 'success' && response.data.body <= 0) {
                        callback.success();
                    }else {
                        callback.error();
                    }
                },function (error) {
                    callback.error("Error");
                });
            }

            _self.getAllStudents = function(callback){
                $http.get(_self.apiRef() + 'getAllStudents')
=======
            },
            
            currentPage : sessionStorage.page ? sessionStorage.page : 'registration',
            
            apiRef: function() {
                return $window.location.origin + window.location.pathname + 'api/';
            },
            _storageHandler: function() {
                return sessionStorage;
            },

            studentExists : function(data,callback){
                $http.post(this.apiRef() + 'studentExists',data)
                .then(function(response){
                    if(response.data.result === 'success' && response.data.body <= 0){
                        callback.success()
                    }else{
                        callback.error();
                    }
                },function(error){
                    callback.error("Error");
                });
            },

            getAllStudents : function(callback){
                $http.get(this.apiRef() + 'getAllStudents')
>>>>>>> c6b9c50ee664670558690709449185aef7b9b973
                .then(function(response){
                    if(response.data.result === 'success'){
                        callback.success(response.data.data);
                    }else{
                        callback.error(response.data.message);
                    }
                },function(error){
                    callback.error(error.getMessage());
                });
<<<<<<< HEAD
            }

            _self.registerStudent = function(credential, callback) {
                if(typeof credential === 'object') {
                    $http.post(_self.apiRef() + 'registerStudent',credential)
=======
            },

            registerStudent: function(credential, callback) {
                if(typeof credential === 'object') {
                    $http.post(this.apiRef() + 'registerStudent',credential)
>>>>>>> c6b9c50ee664670558690709449185aef7b9b973
                        .then(function success(response){
                            if(typeof response.data !== 'object'){
                                callback.success(response.data);
                            }else{
                                callback.error(response.data);
                            }
                        });
                }
<<<<<<< HEAD
            }

            _self.getCandidateInfo = function(callback){
                $http.post(_self.apiRef() + 'getCandidateInfo')
=======
            },

            getCandidateInfo : function(callback){
                $http.post(this.apiRef() + 'getCandidateInfo')
>>>>>>> c6b9c50ee664670558690709449185aef7b9b973
                    .then(function success(candidateData){
                        if(typeof candidateData.data === 'object'){
                               callback.success(candidateData.data); 
                        }
                    }, function error(errorLog){
                        callback.error(errorLog);
                        console.log(errorLog);
                    });
<<<<<<< HEAD
            }

            _self.loginAdmin = function (adminData, callback){
                if(adminData.username && adminData.password){
                    $http.post(_self.apiRef() + 'adminLogin', adminData)
=======
            },

            loginAdmin : function (adminData, callback){
                if(adminData.username && adminData.password){
                    $http.post(this.apiRef() + 'adminLogin', adminData)
>>>>>>> c6b9c50ee664670558690709449185aef7b9b973
                    .then(function success(response){
                        if(typeof response.data === 'object'){
                            callback.success(response.data);
                        }else{
<<<<<<< HEAD
                            _selfisLoggedIn=false;
=======
                            this.isLoggedIn=false;
>>>>>>> c6b9c50ee664670558690709449185aef7b9b973
                            callback.error({});
                        }
                    }, function error(error){   
                        callback.error(error.statusText);
                    })
                }
<<<<<<< HEAD
            }

            _self.changePass = function(data, callback){
                $http.post(_self.apiRef() + 'changePass', data)
=======
            },

            changePass : function(data, callback){
                $http.post(this.apiRef() + 'changePass', data)
>>>>>>> c6b9c50ee664670558690709449185aef7b9b973
                .then(function(response){
                    callback.success(response.data.result);
                }, function(errorLog){
                    callback.error(errorLog);
                });
<<<<<<< HEAD
            }

            _self.getAdminDetails = function (adminId, callback) {
                $http.get(_self.apiRef() + 'getAdminDetails/' + adminId)
=======
            },

            getAdminDetails : function (adminId, callback) {
                $http.get(this.apiRef() + 'getAdminDetails/' + adminId)
>>>>>>> c6b9c50ee664670558690709449185aef7b9b973
                .then(function(response){
                    callback.success(response.data);
                },function(error){
                    callback.error(error);
                })
<<<<<<< HEAD
            }

            _self.voteCandidates =  function(votemodel , callback){
                if(typeof votemodel === 'object') {
                    $http.post(_self.apiRef() + 'voteCandidates',votemodel)
=======
            },

            voteCandidates : function(votemodel , callback){
                if(typeof votemodel === 'object') {
                    $http.post(this.apiRef() + 'voteCandidates',votemodel)
>>>>>>> c6b9c50ee664670558690709449185aef7b9b973
                        .then(function success(response){
                            callback.success(response.data);
                        }, function error(error){
                            callback.error(error);
                        });
                }else{
                    callback.error({});
                }
<<<<<<< HEAD
            }
            _self.getAllVotes = function(callback){
                $http.get(_self.apiRef() + 'getAllVotes')
=======
            },
            getAllVotes : function(callback){
                $http.get(this.apiRef() + 'getAllVotes')
>>>>>>> c6b9c50ee664670558690709449185aef7b9b973
                .then(function (responseData){
                    if(responseData.data.result === 'success'){
                        callback.success(responseData.data.record);
                    }else{  
                        callback.error({});
                    }
                }, function (errorLog){
                    callback.error(errorLog)
                });
<<<<<<< HEAD
            }

            _self.insertUser =  function(userInfo , callback){
                $http.post(_self.apiRef() + 'insertUser', userInfo)
=======
            },

            insertUser :  function(userInfo , callback){
                $http.post(this.apiRef() + 'insertUser', userInfo)
>>>>>>> c6b9c50ee664670558690709449185aef7b9b973
                .then(function(response){
                    callback.success(response.data);
                },function(errorLog){
                    callback.error(errorLog)
                });
<<<<<<< HEAD
            }

            _self.deleteUser = function(userId, callback){
                $http.get(_self.apiRef() + 'deleteUser/' + userId)
=======
            },

            deleteUser : function(userId, callback){
                $http.get(this.apiRef() + 'deleteUser/' + userId)
>>>>>>> c6b9c50ee664670558690709449185aef7b9b973
                .then(function(response){
                    callback.success(response.data.result);
                },function(error){
                    callback.error(result);
                });
<<<<<<< HEAD
            }

            _self.getAllUser = function(callback){
                $http.post(_self.apiRef() + 'getAllUser')
=======
            },

            getAllUser : function(callback){
                $http.post(this.apiRef() + 'getAllUser')
>>>>>>> c6b9c50ee664670558690709449185aef7b9b973
                .then(function(response){
                    if(response.data instanceof Array){
                        callback.success(response.data);
                    }else{
                        callback.success([]);
                    }
                },function(error){
                    callback.error(error);
                });
<<<<<<< HEAD
            }

            _self.consolidateVotes = function(data,callback){
                $http.post(_self.apiRef() + 'consolidateVotes', data)
=======
            },

            consolidateVotes : function(data,callback){
                $http.post(this.apiRef() + 'consolidateVotes', data)
>>>>>>> c6b9c50ee664670558690709449185aef7b9b973
                .then(function(response){
                    callback.success(response.data);
                },function(errorLog){
                    callback.error(errorLog);
                });
<<<<<<< HEAD
            }

            _self.verification = function(passcode,callback){
                var data = {
                    passcode : passcode 
                };
                $http.post(_self.apiRef() + 'verification',data)
=======
            },
            setStatusPoll : function(data,callback){

            },
            verification : function(passcode,callback){
                var data = {
                    passcode : passcode 
                };
                $http.post(this.apiRef() + 'verification',data)
>>>>>>> c6b9c50ee664670558690709449185aef7b9b973
                .then(function(response){   
                    if(response.data.result === 'success'){
                        callback.success(response.data.parties);
                    }else{
                        callback.error(response.data.msg);
                    }
                },function(errorLog){
                    callback.error(errorLog);
                });
<<<<<<< HEAD
            }

            _self.getAllParties = function(callback){
                $http.get(_self.apiRef() + 'getAllParties')
=======
            },

            getAllParties : function(callback){
                $http.get(this.apiRef() + 'getAllParties')
>>>>>>> c6b9c50ee664670558690709449185aef7b9b973
                .then(function(response){
                    if(response.data.result === 'success'){
                        callback.success(response.data);
                    }else{
                     callback.error(response.data.msg);   
                    }
                }, function(errorLog){
                    callback.error(errorLog);
                });
            }
<<<<<<< HEAD
            return _self;
        }
        
        return new generalService();
        
    }
]);
}());

=======
        };
    }
]);
>>>>>>> c6b9c50ee664670558690709449185aef7b9b973
