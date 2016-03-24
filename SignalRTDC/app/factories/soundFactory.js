/*globals angular*/
/*globals Audio*/
(function () {
    'use strict';
    angular
        .module('app')
        .factory('soundFactory', ['SOUNDS', function (SOUNDS) {
            var factory = {};
        
            factory.Success = new Audio(SOUNDS.SUCCESS);
            
            return factory;
        }]);
}());
