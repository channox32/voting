/*global angular*/

(function(){

angular.module('pnhs.voting.directive')
.directive('scroll', function(){
	return {
		restrict : 'AE',
		link : function(scope, element){	
		var scroll, 
			wrapper = document.getElementById('wrapper');
		scroll = new IScroll(wrapper,{
			    mouseWheel: true,

			    scrollbars: true
			});
			console.log(scroll);
		}
	};
});

}());