viewsModule.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when("/", {
    templateUrl : "./home/home.html",
    controller : 'HomeCtrl',
  });
}]);

viewsModule.controller('HomeCtrl', ['$scope', function($scope) {
  var vm = this;

}]);
