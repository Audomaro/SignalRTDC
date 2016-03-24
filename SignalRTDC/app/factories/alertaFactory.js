(function () {
    'use strict';
    angular
        .module('app')
        .factory('alertaFactory', [function () {
            /**
             * Mostrar una alerta.
             * @param {string} Titulo Titulo de la notifacion.
             * @param {string} Mensaje de la notifiacion.
             * @param {string} Icono Url del icono de la notifiacion.
             * @param {string} Tag Nombre unico que identifica la notificacion.
             * @example
             *          alertaFactory('Titulo' + Id, msj, null, null, {
                            Click: function () {
                                console.log('clik')
                            },
                            Show: function () {
                                console.log('Show')
                            },
                            Error: function () {
                                console.log('Error')
                            },
                            Close: function () {
                                console.log('Close')
                            }
                        });
             */
            return function alerta(Titulo, Mensaje, Icono, Tag, Eventos) {
                // Verifica si el navegador permite las notificaciones nativas.
                if (!window.Notification) {
                    alert(Mensaje);
                    return;
                }
                // Si las permite, verifica si se tiene permiso.
                // Si no esta permitido, los pide.
                if (window.Notification.permission !== "granted") {
                    window.Notification.requestPermission();
                    alert("Se requiere permiso para ver las notificaciones.")
                } else {

                    /**
                     * Opciones para configurar la notifiacion.
                     * @typedef {Object} 
                     */
                    var Opciones = {
                        /**
                         * Url del icono de la notificacion, Chrome.
                         * @type {string}
                         * @default null
                         */
                        icon: typeof(Icono) !== 'undefined' ? Icono : 'http://13576-presscdn-0-22.pagely.netdna-cdn.com/wp-content/uploads/2014/05/an_icon.png',
                        /**
                         * Url del icono de la notificacion, Firefox.
                         * @type {string}
                         * @default null
                         */
                        iconUrl: typeof(Icono) !== 'undefined' ? Icono : 'http://13576-presscdn-0-22.pagely.netdna-cdn.com/wp-content/uploads/2014/05/an_icon.png',
                        /** 
                         * Mensaje de la notifiacion.
                         * @type {string}
                         */
                        body: typeof(Mensaje) !== 'undefined' ? Mensaje : 'Notificación',
                        /**
                         * Tag unico que identifica la notifiacion.
                         * @type {string}
                         * @default null
                         */
                        tag: typeof(Tag) !== 'undefined' ? Tag : undefined
                    };

                    console.log('Opciones:', Opciones);
                    if (typeof (Eventos) === 'undefined' || !Eventos) {
                        Eventos = {};
                        Eventos.Show = function () {};
                        Eventos.Click = function () {
                            this.close();
                        };
                        Eventos.Close = function () {};
                        Eventos.Error = function () {};
                    }
                    /**
                     * Crea una nueva notificacion a partir de las opciones
                     */
                    var notification = new window.Notification(Titulo, Opciones, Eventos);

                    /**
                     * Accion que se dispara al mostrarse la notifiacion.
                     */
                    notification.onshow = Eventos.Show;

                    /**
                     * Accion que se dispara al hacer clic sobre la notifacion.
                     */
                    notification.onclick = Eventos.Click;

                    /**
                     * Accion que se dispara al cerrar la notifiacion.
                     */
                    notification.onclose = Eventos.Close;

                    /**
                     * Accion que se dispara al haber un error.
                     */
                    notification.onerror = Eventos.Error;
                }
            };
        }]);
})();
