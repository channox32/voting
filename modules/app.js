/*global angular*/
(function () {
    'use strict';
angular.module('VoteApp', [
    'ngRoute',
    'pnhs.voting.student',
    'pnhs.voting.admin',
    'pnhs.voting.user',
    'pnhs.voting.index'
   ]);
}());


