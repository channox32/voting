/*! 
* angular-paging v2.1.0 by Brant Wills - MIT licensed 
* https://github.com/brantwills/Angular-Paging.git 
*/
angular.module("pnhs.voting.directive",[]).directive("paging",function(){function a(a,b,c){a.$watchCollection("[page,pageSize,total]",function(){k(a,c)})}function b(a,b){return'<ul data-ng-hide="Hide" data-ng-class="ulClass"> <li title="{{Item.title}}" data-ng-class="Item.liClass" data-ng-repeat="Item in List"> <a '+(b.pgHref?'data-ng-href="{{Item.pgHref}}" ':"href ")+'data-ng-click="Item.action()" data-ng-bind="Item.value"></a> </li></ul>'}function c(a,b){a.List=[],a.Hide=!1,a.page=parseInt(a.page)||1,a.total=parseInt(a.total)||0,a.adjacent=parseInt(a.adjacent)||2,a.pgHref=a.pgHref||"",a.dots=a.dots||"...",a.ulClass=a.ulClass||"pagination",a.activeClass=a.activeClass||"active",a.disabledClass=a.disabledClass||"disabled",a.textFirst=a.textFirst||"<<",a.textLast=a.textLast||">>",a.textNext=a.textNext||">",a.textPrev=a.textPrev||"<",a.textTitlePage=a.textTitlePage||"Page {page}",a.textTitleFirst=a.textTitleFirst||"First Page",a.textTitleLast=a.textTitleLast||"Last Page",a.textTitleNext=a.textTitleNext||"Next Page",a.textTitlePrev=a.textTitlePrev||"Previous Page",a.scrollTop=a.$eval(b.scrollTop),a.hideIfEmpty=a.$eval(b.hideIfEmpty),a.showPrevNext=a.$eval(b.showPrevNext),a.showFirstLast=a.$eval(b.showFirstLast)}function d(a,b){a.page>b&&(a.page=b),a.page<=0&&(a.page=1),a.adjacent<=0&&(a.adjacent=2),1>=b&&(a.Hide=a.hideIfEmpty)}function e(a,b){a.page!=b&&(a.page=b,a.pagingAction({page:a.page,pageSize:a.pageSize,total:a.total}),a.scrollTop&&scrollTo(0,0))}function f(a,b,c){if(!(!a.showPrevNext&&!a.showFirstLast||1>b)){var d,f,g;if("prev"===c){d=a.page-1<=0;var h=a.page-1<=0?1:a.page-1;a.showFirstLast&&(f={value:a.textFirst,title:a.textTitleFirst,page:1}),a.showPrevNext&&(g={value:a.textPrev,title:a.textTitlePrev,page:h})}else{d=a.page+1>b;var i=a.page+1>=b?b:a.page+1;a.showPrevNext&&(f={value:a.textNext,title:a.textTitleNext,page:i}),a.showFirstLast&&(g={value:a.textLast,title:a.textTitleLast,page:b})}var j=function(b,c){return{value:b.value,title:b.title,liClass:c?a.disabledClass:"",pgHref:a.pgHref.replace(l,b.page),action:function(){c||e(a,b.page)}}};if(f){var k=j(f,d);a.List.push(k)}if(g){var m=j(g,d);a.List.push(m)}}}function g(a,b,c){var d=0;for(d=a;b>=d;d++)c.List.push({value:d,title:c.textTitlePage.replace(l,d),liClass:c.page==d?c.activeClass:"",pgHref:c.pgHref.replace(l,d),action:function(){e(c,this.value)}})}function h(a){a.List.push({value:a.dots,liClass:a.disabledClass})}function i(a,b){g(1,2,a),3!=b&&h(a)}function j(a,b,c){c!=a-2&&h(b),g(a-1,a,b)}function k(a,b){(!a.pageSize||a.pageSize<=0)&&(a.pageSize=1);var e=Math.ceil(a.total/a.pageSize);c(a,b),d(a,e);var h,k,l=2*a.adjacent+2;f(a,e,"prev"),l+2>=e?(h=1,g(h,e,a)):a.page-a.adjacent<=2?(h=1,k=1+l,g(h,k,a),j(e,a,k)):a.page<e-(a.adjacent+2)?(h=a.page-a.adjacent,k=a.page+a.adjacent,i(a,h),g(h,k,a),j(e,a,k)):(h=e-l,k=e,i(a,h),g(h,k,a)),f(a,e,"next")}var l=/\{page\}/g;return{restrict:"EA",link:a,template:b,scope:{page:"=",pageSize:"=",total:"=",dots:"@",hideIfEmpty:"@",ulClass:"@",activeClass:"@",disabledClass:"@",adjacent:"@",scrollTop:"@",showPrevNext:"@",showFirstLast:"@",pagingAction:"&",pgHref:"@",textFirst:"@",textLast:"@",textNext:"@",textPrev:"@",textTitlePage:"@",textTitleFirst:"@",textTitleLast:"@",textTitleNext:"@",textTitlePrev:"@"}}});