//CONFIG WITH $ROUTEPROVIDER TO SET THE ROUTING AND TEMPLATES
viewsModule.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when("/", {
    templateUrl : "./home/home.html",
  });
}]);
