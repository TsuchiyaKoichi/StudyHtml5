var text = "";
text += "<p>サニタイズのテスト</p>";
text += "<a href='#' onclick='window.alert(\"dangerous\")'>危険なリンク</a>";
text += "<button>危険なボタン</button>";

// 依存性の注入(mySubはngCookiesとngSanitizeに依存する)
angular.module('mySub', ['ngCookies', 'ngSanitize'])
  .controller('myController5',  ['$scope', function(scope) {
    
    scope.msg = text;
  }]);

// 依存性の注入(appはmySubに依存する)
angular.module('app', ['mySub']);

// controllerの作成方法いろいろ
var MyController2 = function(scope) {
  scope.msg = "Hello AngularJS!";
}
MyController2.$inject = ['$scope'];

angular.module('app')
  .controller('myController1', ['$scope', function(scope) {
    scope.msg = "Hello AngularJS!";
  }])
  .controller('myController2', MyController2)
  .controller('myController3', ['$scope', function(scope) {
    scope.name = "田中";
    scope.ret = "";
    scope.onclick = function(e) {
      console.log(e);
      scope.ret = "入力値は" + scope.name + "です。";
    };
  }]);
  
// 1.3以降この記述は非推奨。strictモードでエラーとなる。
// これはminifyするときに$scopeが置き換えられて動作しなくなることを防ぐための処置。
// angular.module('app')
//   .controller('myController1', function($scope) {
//     $scope.msg = "Hello AngularJS!";
//   })
  

// HTMLコンテンツを表示したいときはsceのtrustAsHtmlを使用する
angular.module('app')
  .controller('myController4', ['$scope','$sce', function(scope, sce) {
    scope.msg = text;
    scope.trustMsg = sce.trustAsHtml(text);
  }]);