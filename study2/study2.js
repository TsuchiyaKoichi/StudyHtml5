angular.module('app', []);

angular.module('app')

  // 共通定義
  .constant('CONSTRACT', '定義情報')
  .constant('utils', {
    
    // 変数
    YEAR: 2015,
    
    // オブジェクト
    DEVICES: [
      { id: 0, name: 'PC'},
      { id: 1, name: 'タブレット'},
      { id: 2, name: 'スマートフォン'}
    ],
    
    // 関数
    leftPad: function(val) {
      return ('0000' + val).slice(-4);
    }
  })
  .controller('myController', ['$scope', 'utils', function(scope, utils) {
    scope.device = null;
  }])
  .run(['$rootScope', 'CONSTRACT', 'utils', function(rootScope, CONSTRACT, utils) {
    
    // $rootScopeの定義としてセットする
    rootScope.CONSTRACT = CONSTRACT;
    rootScope.util = utils;
  }]);