/*globals angular*/
(function () {
    'use strict';
    angular
        .module('app')
        .factory('authFactory', ['$sessionStorage', '$state', 'mensajesFactory', function ($sessionStorage, $state, mensajesFactory) {
            /**
             * Facoria.
             */
            var factory = {};

            /**
             * Inidica si los hubs ya han sido conectados.
             */
            factory.HubsConectados = false;
            
            /**
             * Crea la session de usuario.
             * @param {string} usuario Nombre del usuario.
             */
            factory.Login = function (usuario) {
                $sessionStorage.Usuario = usuario;
                // mensajesFactory.Conectar();
                $state.go('inicio');
            };

            /**
             * Conecta las funciones de signalr.
             */
            factory.ConectarHubs = function () {
                console.log('se han conectado los hubs.');
                factory.HubsConectados = true;
                mensajesFactory.Conectar();
            };

            /**
             *  Termina la sesion del usuario.
             */
            factory.Cerrar = function () {
                $sessionStorage.$reset();
                mensajesFactory.Desconectar();
                $state.go('login');
            };

            /**
             * Indica si ha iniciado sesion.
             */
            factory.IsLogin = function () {
                var b = false;
                if (typeof ($sessionStorage.Usuario) !== 'undefined') {
                    b = true;
                }
                return b;
            };

            /**
             * Retorna la sesion del usuario.
             */
            factory.GetSession = function () {
                return $sessionStorage.Usuario;
            };

            return factory;
        }]);
}());
