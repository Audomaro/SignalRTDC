(function () {
    'use strict';
    angular
        .module('app')
        .controller('loginController', ['$scope', 'authFactory', function ($scope, authFactory) {
            $scope.Titulo = 'Login';
            
            $scope.Usuario = '';
            
            $scope. btnIniciar_Click = function () {
                if ($scope.Usuario) {
                    authFactory.Login($scope.Usuario);
                } else {
                    $('#Usuario').focus();
                }
            };
        }]);
})();
