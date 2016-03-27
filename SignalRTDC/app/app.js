// http://stackoverflow.com/questions/27212182/angularjs-ui-router-how-to-redirect-to-login-page
/*globals angular*/
(function () {
    'use strict';
    angular
        .module('app', ['ui.router', 'SignalR', 'ngStorage'])
        .constant('SOUNDS', {
            "SUCCESS": './sounds/success.mp3'
        })
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$localStorageProvider', '$sessionStorageProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $localStorageProvider, $sessionStorageProvider) {
            /**
             * Prefijo de las variables localStorage de esta app.
             */
            $localStorageProvider.setKeyPrefix('AngularSiganlR_');
            /**
             * Prefijo de las variables sessionStorage de esta app.
             */
            $sessionStorageProvider.setKeyPrefix('AngularSiganlR_');

            /**
             * Ruta default de la app.
             */
            $urlRouterProvider.otherwise('/');

            /**
             * Estados de la app.
             */
            $stateProvider
                .state('login', {
                    name: 'login',
                    url: '/',
                    templateUrl: 'app/partials/login.html',
                    controller: 'loginController'
                })
                .state('inicio', {
                    name: 'inicio',
                    url: '/inicio',
                    templateUrl: 'app/partials/inicio.html',
                    controller: 'inicioController'
                });

            /**
             * Habilita la navegacion sin # (gato tradiciona de la apps de AngularJS),
             * pero este no es compatible con ui.router.
             * Codigo:
             *          $locationProvider.html5Mode(true);
             */
        }])
        .run(['$rootScope', '$state', 'authFactory', function ($rootScope, $state, authFactory) {
            //$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.$on('$stateChangeStart', function (event, toState) {
                console.log('$stateChangeStart');
                var isLogin = toState.name === "login";
                if (isLogin) {
                    if (authFactory.IsLogin()) {
                        event.preventDefault();
                        $state.go('inicio');
                    }
                    return;
                }
                /**
                 * Si esta autenticado, entonces conecta los hubs.
                 */
                if (!authFactory.IsLogin()) {
                    event.preventDefault();
                    $state.go('login');
                } else {
                    console.log('Hubs conectados: ', authFactory.HubsConectados);
                    if (!authFactory.HubsConectados) {
                        authFactory.ConectarHubs();
                        authFactory.HubsConectados = true;
                    }
                    console.log('authFactory.GetSession():', authFactory.GetSession());
                }
            });
        }]);
}());
