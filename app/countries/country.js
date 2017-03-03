//CONFIG WITH $ROUTEPROVIDER TO SET THE ROUTING AND TEMPLATES
viewsModule.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when("/countries", {
        templateUrl: "./countries/country.html",
        controller: 'CountryCtrl'
    });
}]);

//CONTROLLER THAT RUNS CCFINDCOUNTRY FUNCTION THAT RETURNS A PROMISE WITH ALL THE COUNTRIES
//BIND THE RETURNED COUNTRIES TO $SCOPE.COUNTRIES TO BE USE IN COUNTRY.HTML
viewsModule.controller('CountryCtrl', ['$scope', 'ccFindCountry', function($scope, ccFindCountry) {
    ccFindCountry()
        .then(function(country) {
            $scope.countries = country.geonames;
      });
}]);
