angular.module('app', ['ngRoute'])
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
    // filter定義は自分で作成することもできる
    .filter('reverse', function() {
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
    .controller('Page1Controller', ['$scope', '$routeParams', 'reverse', function(scope, routeParams, reverse) {
        scope.msg = 'This is page1 template.';
        scope.name = routeParams.name;
    }]);