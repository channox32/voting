var voteApp = angular.module('VoteApp');

voteApp.service('auth', ['generalService','$window',function(generalService,$window){
	return {
		isLoggedIn : api._storageHandler().userId ? true : false,

		redirect : function(page){
			if(page){
				$window.location.href = '#' + page;
				
			}else{
				$window.location.href = "#/"
			}
		}
	}



}]);