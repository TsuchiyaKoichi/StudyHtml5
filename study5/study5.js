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
            .when('/section3', {
                templateUrl: 'section3.html',
                controller: 'Section3Controller'
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
           title: 'アドインなしで実現可能！ ドラッグ＆ドロップを使いこなそう',
           url: '#/section3'
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
    .controller('Section3Controller', ['$scope', function(scope) {
        
        $(document).on('dragstart', '.item', function(e) {
            event.dataTransfer.setData('text', event.target.id);
        });
        
        $(document).on('dragover', '.container', function(e) {
            event.preventDefault();
        });
        
        $(document).on('drop', '.container', function(e) {
            var id = event.dataTransfer.getData('text');
            var element = document.getElementById(id);
            event.target.appendChild(element);
            event.preventDefault();
        });
        
        // var container1 = document.getElementById('container1');
        // container1.addEventListener('dragover', function(event) {
        //     event.preventDefault();
        // });
        // container1.addEventListener('drop', function(event) {
        //     var id = event.dataTransfer.getData('text');
        //     var element = document.getElementById(id);
        //     event.currentTarget.appendChild(element);
        //     event.preventDefault();
        // });
        
        // var container2 = document.getElementById('container2');
        // container2.addEventListener('dragover', function(event) {
        //     event.preventDefault();
        // });
        // container2.addEventListener('drop', function(event) {
        //     var id = event.dataTransfer.getData('text');
        //     var element = document.getElementById(id);
        //     event.currentTarget.appendChild(element);
        //     event.preventDefault();
        // });
    }])
    .controller('Section4Controller', ['$scope', function(scope) {
        
        // span:nth-child(4)で3番目のspanが選択される理由
        // nth-childは親要素からの数を指定するものでspanを数える訳ではない。
        // なのでこのサンプルの場合は<br>がnth-child(0)となり最初のspanがnth-child(1)である。
        scope.selectors = [];
        scope.selectors.push('.div1');
        scope.selectors.push('span');
        scope.selectors.push('li:nth-child(3)');
        scope.selectors.push('span:nth-child(1)');
        scope.selectors.push('span:nth-child(4)');
        
        scope.selectorsAll = [];
        scope.selectorsAll.push('.div1');
        scope.selectorsAll.push('span');
        scope.selectorsAll.push('li:nth-child(2n+1)');
        scope.selectorsAll.push('li:nth-child(2n)');
        scope.selectorsAll.push('li:nth-child(-n+2)');
        scope.selectorsAll.push('span:nth-child(-n+2)');
        
        scope.highlight = function(val) {
            
            // 一旦全てのhighlightクラスを除去する
            var target = document.getElementById('view1');
            target = removeAllHighlight(target);
            
            // 対象へhighlightクラスをセットする
            target.querySelector(val).classList.add('highlight');
        };
        
        scope.highlightAll = function(val) {
            
            // 一旦全てのhighlightクラスを除去する
            var target = document.getElementById('view2');
            target = removeAllHighlight(target);
            
            // 対象へhighlightクラスをセットする
            var elements = target.querySelectorAll(val);
            for(var i = 0; i < elements.length; i++) {
                elements[i].classList.add('highlight');
            }
        };
        
        function removeAllHighlight(origin) {
            
            // ノードリストをディープコピー
            var clone = origin.cloneNode(true);
            
            // highlightクラスを持つエレメントを取得し除去する
            var elements = clone.querySelectorAll('.highlight');
            for(var i = 0; i < elements.length; i++) {
                elements[i].classList.remove('highlight');
            }
            
            // 元のノードに変更したノードをセットする
            origin.parentNode.replaceChild(clone, origin);
            
            return clone;
        }
    }]);