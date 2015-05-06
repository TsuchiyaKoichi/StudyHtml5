angular.module('app', [])
  .controller('menuController', ['$scope', function(scope) {
    
    scope.sites = [];
    
    scope.sites.push({
      name: 'AngularJS TIPS',
      url: 'http://www.buildinsider.net/web/angularjstips/0001',
      sample: './study1'
    });
    
    scope.sites.push({
      name: 'AngularJSを本格的に使うための、7つのTIPS',
      url: 'http://flabo.io/code/20140926/01-angularjs-application-7-tips/',
      sample: './study2'
    });
    
    scope.sites.push({
      name: 'AngularJS 入門(Qiita)',
      url: 'http://qiita.com/lga0503/items/d8efddcad2574e1938f1',
      sample: './study3'
    });
    
    scope.sites.push({
      name: 'Geolocation API',
      url: 'http://www.htmq.com/geolocation/',
      sample: './study4'
    });
    
    scope.sites.push({
      name: '人気順に説明する初めてのHTML5開発',
      url: 'http://www.atmarkit.co.jp/ait/subtop/features/dotnet/app/introhtml5_index.html',
      sample: './study5'
    });
    
    scope.sites.push({
      name: 'AngularJS のデータバインドを支える $watch',
      url: 'http://angularjsninja.com/blog/2013/12/13/angularjs-watch/',
      sample: './study6'
    });
    
    // 次のネタ
    // AngularJS のデータバインドを支える $watch http://angularjsninja.com/blog/2013/12/13/angularjs-watch/
  }]);