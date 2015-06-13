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

    scope.sites.push({
      name: 'Knockout.js 日本語ドキュメント',
      url: 'http://kojs.sukobuto.com/',
      sample: './study7'
    });
    
    scope.sites.push({
      name: 'DOM操作の最適化によるJavaScriptチューニング',
      url: 'https://html5experts.jp/yoshikawa_t/1888/',
      sample: './study8'
    });
    
    scope.sites.push({
      name: 'JavaScript初級者から中級者になろう',
      url: 'http://uhyohyo.net/javascript/',
      sample: './study9'
    });

    scope.sites.push({
      name: 'HIGHCHARTS',
      url: 'http://www.highcharts.com/',
      sample: './study10'
    });
  }]);