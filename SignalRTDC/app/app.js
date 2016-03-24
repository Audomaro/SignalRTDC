// http://stackoverflow.com/questions/27212182/angularjs-ui-router-how-to-redirect-to-login-page
/*globals angular*/
(function () {
    'use strict';
    angular
        .module('app', ['ngMaterial', 'ngMessages', 'ui.router', 'SignalR', 'ngStorage'])
        .constant('SOUNDS', {
            "SUCCESS": './sounds/success.mp3'
        })
        .config(['$mdThemingProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider', '$localStorageProvider', '$sessionStorageProvider', function ($mdThemingProvider, $stateProvider, $urlRouterProvider, $locationProvider, $localStorageProvider, $sessionStorageProvider) {

            /**
             * Colores de material:
             * red
             * pink
             * purple
             * deep-purple
             * indigo
             * blue
             * light-blue
             * cyan
             * teal
             * green
             * light-green
             * lime
             * yellow
             * amber
             * orange
             * deep-orange
             * brown
             * grey
             * blue-grey
             */
            $mdThemingProvider
                .theme('default')
                .primaryPalette('light-blue')
                .accentPalette('cyan')
                .warnPalette('yellow')
                .backgroundPalette('grey');

            //$mdThemingProvider.definePalette('amazingPaletteName', {
            //    '50': 'ffebee',
            //    '100': 'ffcdd2',
            //    '200': 'ef9a9a',
            //    '300': 'e57373',
            //    '400': 'ef5350',
            //    '500': 'f44336',
            //    '600': 'e53935',
            //    '700': 'd32f2f',
            //    '800': 'c62828',
            //    '900': 'b71c1c',
            //    'A100': 'ff8a80',
            //    'A200': 'ff5252',
            //    'A400': 'ff1744',
            //    'A700': 'd50000',
            //    'contrastDefaultColor': 'light', // whether, by default, text (contrast) // on this palette should be dark or light
            //    'contrastDarkColors': ['50', '100', '200', '300', '400', 'A100'], //hues which contrast should be 'dark' by default
            //    'contrastLightColors': undefined // could also specify this if default was 'dark'
            //});

            //$mdThemingProvider.theme('default')
            //    .primaryPalette('amazingPaletteName')

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
