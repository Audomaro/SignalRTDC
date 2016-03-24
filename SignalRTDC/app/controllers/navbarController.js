/*globals angular*/
(function () {
    'use strict';
    angular
        .module('app')
        .controller('navbarController', ['$scope', '$mdDialog', '$mdSidenav', 'authFactory', function ($scope, $mdDialog, $mdSidenav, authFactory) {
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
                console.log('menu');
                $mdSidenav('left').toggle();
            };

            $scope.Close = function () {
                $mdSidenav('left').close()
            };
        }]);
}());
