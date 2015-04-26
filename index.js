angular.module('app', [])
  .controller('menuController', ['$scope', function(scope) {
    
    scope.sites = [];
    
    scope.sites.push({
      name: 'AngularJS TIPS',
      url: 'http://www.buildinsider.net/web/angularjstips/0001',
      sample: 'study1.html'
    });
    
    scope.sites.push({
      name: 'AngularJSを本格的に使うための、7つのTIPS',
      url: 'http://flabo.io/code/20140926/01-angularjs-application-7-tips/',
      sample: 'study2.html'
    });
    
    scope.sites.push({
      name: 'AngularJS 入門(Qiita)',
      url: 'http://qiita.com/lga0503/items/d8efddcad2574e1938f1',
      sample: 'study3.html'
    });
  }]);