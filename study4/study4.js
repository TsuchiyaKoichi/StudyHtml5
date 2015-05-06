angular.module('app', [])
    .controller('mainController', ['$scope', function(scope) {
        
        // scope.position = {};
        // scope.position2 = {};
        
        function successCallback(position) {
            console.log(position);
            scope.position = position;
            scope.$apply();
        }
        
        function successCallback2(position) {
            console.log(position);
            scope.position2 = position;
            scope.$apply();
        }
        
        function errorCallback(error) {
            console.log(error);
        }
        
        scope.getCurrentPos = function() {
            console.log('getCurrentPosition');
            navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {});
        };
        
        var watchId;
        scope.watchPosition = function() {
            watchId = navigator.geolocation.watchPosition(successCallback2, errorCallback, {});
        };
        
        scope.stopPosWatch = function() {
            navigator.geolocation.clearWatch(watchId);
        };
    }]);