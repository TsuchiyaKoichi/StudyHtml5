angular.module('app', ['ngRoute'])
    .factory('smartphonesService', ['$q', '$timeout', function($q, $timeout) {
        
        // サービスを作成する
        // $qを利用してdeferができる
        
        var smartphones = ['iPhone', 'Android', 'WindowsPhone'];
        
        return function() {
            
            var defer = $q.defer();
            
            $timeout(function() {
                defer.resolve(smartphones);
            }, 3000);
            
            return defer.promise;
        };
    }])
    .directive('tooltip', ['$parse', function(parse) {
       
       return {
           restrict: 'A',
           template: '<span>[template]</span><i ng-transclude></i>',
           transclude: true,
           link: function(scope, element, attr)  {

                var value = parse(attr.tooltip)(scope);
                $(element).tooltip({
                    content: value
                });
           }
       };
    }]);

angular.module('app')
    .config(['$routeProvider', function(rootProvider) {
        
        rootProvider
            .when('/', {
                templateUrl: 'main.html',
                controller: 'MainController'
            })
            .when('/page1/:name', {
                templateUrl: 'page1.html',
                controller: 'Page1Controller'
            })
            .when('/page2', {
                templateUrl: 'page2.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    }])
    .filter('reverse', function() {
        // filter定義は自分で作成することもできる
        return function(values) { return values.concat().reverse(); }; 
    })
    .controller('MainController', ['$scope', function(scope) {
        
        scope.msg = 'This is main template.';
        scope.pages = [
            { url: '#/page1/tsuchiya', title: 'Page1' },
            { url: '#/page2', title: 'Page2' },
            { url: '#/page3', title: 'Page3' }
        ];
    }])
    .controller('Page1Controller', ['$scope', '$routeParams', 'smartphonesService', function(scope, routeParams, smartphonesService) {
        scope.msg = 'This is page1 template.';
        scope.name = routeParams.name;
        //scope.smartphones = smartphonesService();
        scope.smartphones = [];
        smartphonesService()
            .then(function(result) { scope.smartphones = result; });
    }]);