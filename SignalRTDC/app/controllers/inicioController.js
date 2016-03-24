/*globals angular*/
/*globals console*/
(function () {
    'use strict';
    angular
        .module('app')
        .controller('inicioController', ['$scope', '$rootScope', 'authFactory', 'mensajesFactory', function ($scope, $rootScope, authFactory, mensajesFactory) {
            $scope.Titulo = 'Inicio';

            $scope.Saludar = function (msj) {
                console.log(msj);
                mensajesFactory.Saludar(msj);
            };

            $scope.Conectados = function () {
                return mensajesFactory.Conectados();
            };
        }]);
}());
