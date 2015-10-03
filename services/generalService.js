var voteApp = angular.module('VoteApp');

voteApp.service('generalService', ['$http', '$window',
    function($http, $window) {
        return {
            
            isLoggedIn : sessionStorage.userId ? true : false,

            redirect : function(page){
                if(page){
                    $window.location.href = '#' + page;
                }else{
                    $window.location.href = "#/"
                }
            },
            
            currentPage : sessionStorage.page ? sessionStorage.page : 'registration',
            
            apiRef: function() {
                return $window.location.origin + window.location.pathname + 'api/';
            },
            _storageHandler: function() {
                return sessionStorage;
            },

            registerStudent: function(credential, callback) {
                if(typeof credential === 'object') {
                    $http.post(this.apiRef() + 'registerStudent',credential)
                        .then(function success(response){
                            if(typeof response.data !== 'object'){
                                callback.success(response.data);
                            }else{
                                callback.error(response.data);
                            }
                        });
                }
            },

            getCandidateInfo : function(callback){
                $http.post(this.apiRef() + 'getCandidateInfo')
                    .then(function success(candidateData){
                        if(typeof candidateData.data === 'object'){
                               callback.success(candidateData.data); 
                        }
                    }, function error(errorLog){
                        callback.error(errorLog);
                        console.log(errorLog);
                    });
            },

            loginAdmin : function (adminData, callback){
                if(adminData.username && adminData.password){
                    $http.post(this.apiRef() + 'adminLogin', adminData)
                    .then(function success(response){
                        if(typeof response.data === 'object'){
                            callback.success(response.data);
                        }else{
                            this.isLoggedIn=false;
                            callback.error({});
                        }
                    }, function error(error){   
                        callback.error(error.statusText);
                    })
                }
            },

            changePass : function(data, callback){
                $http.post(this.apiRef() + 'changePass', data)
                .then(function(response){
                    callback.success(response.data.result);
                }, function(errorLog){
                    callback.error(errorLog);
                });
            },

            getAdminDetails : function (adminId, callback) {
                $http.get(this.apiRef() + 'getAdminDetails/' + adminId)
                .then(function(response){
                    callback.success(response.data);
                },function(error){
                    callback.error(error);
                })
            },

            voteCandidates : function(votemodel , callback){
                if(typeof votemodel === 'object') {
                    $http.post(this.apiRef() + 'voteCandidates',votemodel)
                        .then(function success(response){
                            callback.success(response.data);
                        }, function error(error){
                            callback.error(error);
                        });
                }else{
                    callback.error({});
                }
            },
            getAllVotes : function(callback){
                $http.get(this.apiRef() + 'getAllVotes')
                .then(function (responseData){
                    if(responseData.data.result === 'success'){
                        callback.success(responseData.data.record);
                    }else{  
                        callback.error({});
                    }
                }, function (errorLog){
                    callback.error(errorLog)
                });
            },

            insertUser :  function(userInfo , callback){
                $http.post(this.apiRef() + 'insertUser', userInfo)
                .then(function(response){
                    callback.success(response.data);
                },function(errorLog){
                    callback.error(errorLog)
                });
            },

            deleteUser : function(userId, callback){
                $http.get(this.apiRef() + 'deleteUser/' + userId)
                .then(function(response){
                    callback.success(response.data.result);
                },function(error){
                    callback.error(result);
                });
            },

            getAllUser : function(callback){
                $http.post(this.apiRef() + 'getAllUser')
                .then(function(response){
                    if(response.data instanceof Array){
                        callback.success(response.data);
                    }else{
                        callback.success([]);
                    }
                },function(error){
                    callback.error(error);
                });
            },

            consolidateVotes : function(data,callback){
                $http.post(this.apiRef() + 'consolidateVotes', data)
                .then(function(response){
                    callback.success(response.data);
                },function(errorLog){
                    callback.error(errorLog);
                });
            },
            setStatusPoll : function(data,callback){

            },
            verification : function(passcode,callback){
                var data = {
                    passcode : passcode 
                };
                $http.post(this.apiRef() + 'verification',data)
                .then(function(response){   
                    if(response.data.result === 'success'){
                        callback.success(response.data.parties);
                    }else{
                        callback.error(response.data.msg);
                    }
                },function(errorLog){
                    callback.error(errorLog);
                });
            },

            getAllParties : function(callback){
                $http.get(this.apiRef() + 'getAllParties')
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
        };
    }
]);