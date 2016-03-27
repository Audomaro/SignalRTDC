/*globals angular*/
/*globals console*/
(function () {
    'use strict';
    angular
        .module('app')
        .factory('mensajesFactory', ['$rootScope', 'Hub', 'alertaFactory', 'soundFactory', function ($rootScope, Hub, alertaFactory, soundFactory) {
            var plista = {},
                hub,
                saludar,
                listar;

            //declaring the hub connection
            hub = new Hub('mensajesHub', {

                //client side methods
                listeners: {
                    'Saludos': function (Id) {
                        console.log('ConId:', Id);
                        $rootScope.$apply();
                    },
                    'SaludosDe': function (Id, msj) {
                        soundFactory.Success.play();
                        alertaFactory('Saludos de ' + Id.substring(0, 7), msj);
                        $rootScope.$apply();
                    },
                    'Listar': function (lista) {
                        plista = lista;
                        $rootScope.$apply();
                    }
                },

                //server side methods
                methods: ['Saludar'],

                // //query params sent on initial connection
                // queryParams: {
                //     'token': 'exampletoken'
                // },

                //handle connection error
                errorHandler: function (error) {
                    console.log(error);
                },

                //specify a non default root
                rootPath: '/SignalRTDC/signalr'//, // Produccion, QA

                //stateChanged: function (state) {
                //    switch (state.newState) {
                //        case $.signalR.connectionState.connecting:
                //            //your code here
                //            break;
                //        case $.signalR.connectionState.connected:
                //            //your code here
                //            break;
                //        case $.signalR.connectionState.reconnecting:
                //            //your code here
                //            break;
                //        case $.signalR.connectionState.disconnected:
                //            //your code here
                //            break;
                //    }
                //}
            });
            hub.disconnect();
            /**
             * Funcion para mandar saludos a todos.
             * @param {string} mensaje Mensaje.
             */
            saludar = function (mensaje) {
                hub.Saludar(mensaje); //Calling a server method
            };

            /**
             * Lista de usuarios conectados.
             * @returns {Object} Lista de usuarios conectados.
             */
            listar = function () {
                return plista;
            };

            return {
                Saludar: saludar,
                Conectados: listar,
                Conectar: hub.connect,
                Desconectar: hub.disconnect
            };
        }]);
}());
