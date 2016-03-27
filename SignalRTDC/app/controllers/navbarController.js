/*globals angular*/
(function () {
    'use strict';
    angular
        .module('app')
        .controller('navbarController', ['$scope', 'authFactory', function ($scope, authFactory) {
            $scope.openMenu = function ($mdOpenMenu, ev) {
                //var originatorEv = ev;
                $mdOpenMenu(ev);
            };

            $scope.IsAuth = function () {
                return authFactory.IsLogin();
            };

            $scope.Cerrar = function () {
                authFactory.Cerrar();
            };

            $scope.Menu = function () {
            
            };

            $scope.Close = function () {
            };
        }]);
}());
