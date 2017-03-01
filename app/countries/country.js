viewsModule.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when("/countries", {
        templateUrl: "./countries/country.html",
        controller: 'CountryCtrl'
    });
}]);

viewsModule.controller('CountryCtrl', ['$scope', 'ccFindCountry', function($scope, ccFindCountry) {
    ccFindCountry()
        .then(function(country) {
            $scope.countries = country.geonames;
      });
}]);
