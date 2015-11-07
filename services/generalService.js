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
                    $window.location.href = '#' + page;
                }else{
                    $window.location.href = "#/"
                }
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
                .then(function(response){
                    if(response.data.result === 'success'){
                        callback.success(response.data.data);
                    }else{
                        callback.error(response.data.message);
                    }
                },function(error){
                    callback.error(error.getMessage());
                });
            }

            _self.registerStudent = function(credential, callback) {
                if(typeof credential === 'object') {
                    $http.post(_self.apiRef() + 'registerStudent',credential)
                        .then(function success(response){
                            if(typeof response.data !== 'object'){
                                callback.success(response.data);
                            }else{
                                callback.error(response.data);
                            }
                        });
                }
            }

            _self.getCandidateInfo = function(callback){
                $http.post(_self.apiRef() + 'getCandidateInfo')
                    .then(function success(candidateData){
                        if(typeof candidateData.data === 'object'){
                               callback.success(candidateData.data); 
                        }
                    }, function error(errorLog){
                        callback.error(errorLog);
                        console.log(errorLog);
                    });
            }

            _self.loginAdmin = function (adminData, callback){
                if(adminData.username && adminData.password){
                    $http.post(_self.apiRef() + 'adminLogin', adminData)
                    .then(function success(response){
                        if(typeof response.data === 'object'){
                            callback.success(response.data);
                        }else{
                            _selfisLoggedIn=false;
                            callback.error({});
                        }
                    }, function error(error){   
                        callback.error(error.statusText);
                    })
                }
            }

            _self.changePass = function(data, callback){
                $http.post(_self.apiRef() + 'changePass', data)
                .then(function(response){
                    callback.success(response.data.result);
                }, function(errorLog){
                    callback.error(errorLog);
                });
            }

            _self.getAdminDetails = function (adminId, callback) {
                $http.get(_self.apiRef() + 'getAdminDetails/' + adminId)
                .then(function(response){
                    callback.success(response.data);
                },function(error){
                    callback.error(error);
                })
            }

            _self.voteCandidates =  function(votemodel , callback){
                if(typeof votemodel === 'object') {
                    $http.post(_self.apiRef() + 'voteCandidates',votemodel)
                        .then(function success(response){
                            callback.success(response.data);
                        }, function error(error){
                            callback.error(error);
                        });
                }else{
                    callback.error({});
                }
            }
            _self.getAllVotes = function(callback){
                $http.get(_self.apiRef() + 'getAllVotes')
                .then(function (responseData){
                    if(responseData.data.result === 'success'){
                        callback.success(responseData.data.record);
                    }else{  
                        callback.error({});
                    }
                }, function (errorLog){
                    callback.error(errorLog)
                });
            }

            _self.insertUser =  function(userInfo , callback){
                $http.post(_self.apiRef() + 'insertUser', userInfo)
                .then(function(response){
                    callback.success(response.data);
                },function(errorLog){
                    callback.error(errorLog)
                });
            }

            _self.deleteUser = function(userId, callback){
                $http.get(_self.apiRef() + 'deleteUser/' + userId)
                .then(function(response){
                    callback.success(response.data.result);
                },function(error){
                    callback.error(result);
                });
            }

            _self.getAllUser = function(callback){
                $http.post(_self.apiRef() + 'getAllUser')
                .then(function(response){
                    if(response.data instanceof Array){
                        callback.success(response.data);
                    }else{
                        callback.success([]);
                    }
                },function(error){
                    callback.error(error);
                });
            }

            _self.consolidateVotes = function(data,callback){
                $http.post(_self.apiRef() + 'consolidateVotes', data)
                .then(function(response){
                    callback.success(response.data);
                },function(errorLog){
                    callback.error(errorLog);
                });
            }

            _self.verification = function(passcode,callback){
                var data = {
                    passcode : passcode 
                };
                $http.post(_self.apiRef() + 'verification',data)
                .then(function(response){   
                    if(response.data.result === 'success'){
                        callback.success(response.data.parties);
                    }else{
                        callback.error(response.data.msg);
                    }
                },function(errorLog){
                    callback.error(errorLog);
                });
            }

            _self.getAllParties = function(callback){
                $http.get(_self.apiRef() + 'getAllParties')
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
            return _self;
        }
        
        return new generalService();
        
    }
]);
}());

