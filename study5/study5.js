angular.module('app', ['ngRoute']);
angular.module('app')
    .config(['$routeProvider', function(routeProvider) {
        
        routeProvider
            .when('/', {
                templateUrl: 'menu.html',
                controller: 'MenuController'
            })
            .when('/section1', {
                templateUrl: 'section1.html',
                controller: 'Section1Controller'
            })
            .when('/section2', {
                templateUrl: 'section2.html'
            })
            .when('/section4', {
                templateUrl: 'section4.html',
                controller: 'Section4Controller'
            })
            .otherwise({
                redirectTo: '/'
            });
    }])
    .controller('MenuController', ['$scope', function(scope) {
        
        // セクション情報
        scope.sections = [];
        scope.sections.push({
           title: '位置情報をブラウザで活用！ Geolocationを使いこなそう',
           url: '#/section1'
        });
        scope.sections.push({
           title: 'ブラウザでストレージ？ Web Storageを使いこなそう',
           url: '#/section2'
        });
        scope.sections.push({
           title: 'DOM操作の主流になるか！？ セレクタAPIを使いこなそう',
           url: '#/section4'
        });
        
        
        // HTML5対応状況チェック
        scope.functions = [];
        var check = false;
        
        // Geolocation API
        check = navigator.geolocation !== undefined;
        scope.functions.push({ name: 'Geolocation API', enable: check });
        
        // Web Storage
        check = window.sessionStorage !== undefined;
        scope.functions.push({ name: 'Web Storage', enable: check });
    }])
    //====================================================================
    // 位置情報をブラウザで活用！ Geolocationを使いこなそう
    //====================================================================
    .controller('Section1Controller', ['$scope', function(scope) {
        
        
        // 現在位置取得
        function successCallback(position) {
            scope.position = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy
            };
            
            // GoogleMapを表示
            var map = document.getElementById('gmap');
            var latlng = new google.maps.LatLng(scope.position.latitude, scope.position.longitude);
            var options = {
                zoom: 16,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var mapObj = new google.maps.Map(map, options);
            
            // マップに現在位置を描く
            var circleOptions = {
                center: latlng,
                radius: 1,
                strokeWeight: 0,
                fillColor: '#3366FF',
                fillOpacity: 0.8
            };
            var circle = new google.maps.Circle(circleOptions);
            circle.setMap(mapObj);
            
            // マップに精度円を描く
            circleOptions = {
                map: mapObj,
                center: latlng,
                radius: scope.position.accuracy,
                strokeWeight: 1,
                strokeColor: '#0000FF',
                strokeOpacity: 0.7,
                fillColor: '#0000FF',
                fillOpacity: 0.4
            };
            circle = new google.maps.Circle(circleOptions);
            
            scope.$apply();
        }
        function errorCallback(error) {
            alert('error:' + error.code);
        }
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 60000
        };
        scope.getPosition = function() {
            navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
        };
    }])
    //====================================================================
    // ブラウザでストレージ？ Web Storageを使いこなそう
    //====================================================================
    .controller('SessionController', ['$scope', function(scope) {
        
        scope.items = [];
        
        // ストレージから値を取得
        getItems();
        
        // submit処理
        scope.submit = function() {
            // [tips]Keyと値のセットを保存する
            sessionStorage.setItem(this.key, this.value);
            
            getItems();
            this.key = "";
            this.value = "";
        };
        
        // 1件削除
        scope.remove = function(key) {
            // [tips]ストレージから1件削除する
            sessionStorage.removeItem(key);
            
            getItems();
        };
        
        // 全削除処理
        scope.removeAll = function() {
            // [tips]ストレージを全削除
            sessionStorage.clear();
            
            scope.items.length = 0;
        };
        
        // ストレージのアイテム全件取得
        function getItems() {
            
            scope.items.length = 0;
            
            // [tips]保存されている数でループする
            for(var i = 0; i < sessionStorage.length; i++) {
                
                // [tips]Keyを取得する
                var key = sessionStorage.key(i);
                // [tips]Keyから値を取得する
                var value = sessionStorage.getItem(key);
                scope.items.push({ key: key, value: value });
            }
        }
    }])
    .controller('LocalController', ['$scope', '$window', function(scope, $window) {
        
        scope.items = [];
        
        // ストレージから値を取得
        getItems();
        
        // submit処理
        scope.submit = function() {
            // [tips]Keyと値のセットを保存する
            localStorage.setItem(this.key, this.value);
            
            getItems();
            this.key = "";
            this.value = "";
        };
        
        // 1件削除
        scope.remove = function(key) {
            // [tips]ストレージから1件削除する
            localStorage.removeItem(key);
            
            getItems();
        };
        
        // 全削除処理
        scope.removeAll = function() {
            // [tips]ストレージを全削除
            localStorage.clear();
            
            scope.items.length = 0;
        };
        
        // ストレージのアイテム全件取得
        function getItems() {
            
            scope.items.length = 0;
            
            // [tips]保存されている数でループする
            for(var i = 0; i < localStorage.length; i++) {
                
                // [tips]Keyを取得する
                var key = localStorage.key(i);
                // [tips]Keyから値を取得する
                var value = localStorage.getItem(key);
                scope.items.push({ key: key, value: value });
            }
        }
        
        $window.addEventListener('storage', function(e) {
           scope.msg = '他のセッションでストレージが変更されました';
           console.log(e);
           getItems();
           scope.$apply();
        });
    }])
    .controller('Section4Controller', ['$scope', function(scope) {
        
        scope.selector1 = 'div1';
        
        scope.test = function(val) {
            console.log("." + val);
            document.querySelector(val).classList.add(val);
        };
    }]);