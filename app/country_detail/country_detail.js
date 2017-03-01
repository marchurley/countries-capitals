viewsModule.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when("/countries/:country", {
            templateUrl: "./country_detail/country_detail.html",
            controller: 'CountryDetailCtrl',
            //Resolve: Code stops until resolved. Only then continues. Thanks to that we have countryCode variable to use in controller
            resolve: {
                //adding a countryDetails dependency. This variable can be used in the controller after it is resolved
                countryDetails: ['ccFindIndividualCountry', 'ccFindCountry', '$route', '$location', function(ccFindIndividualCountry, ccFindCountry, $route, $location) {
                    var countryCode = $route.current.params.country;
                    var test = ccFindCountry();
                    if (countryCode.length > 2) {
                        console.log(test);
                        $location.path('/error');
                        return;
                    }
                    return ccFindIndividualCountry($route.current.params.country);
                }],

                cityDetails: ['ccFindCapital', '$route', function(ccFindCapital, $route) {
                    return ccFindCapital($route.current.params.country);
                }],

                neighbors: ['findNeighbors', '$route', function(findNeighbors, $route) {
                    return findNeighbors($route.current.params.country);
                }]

            }
        })
        .when('/error', {
            template: '<h1>Error Page Not Found</h1><p>Please try another country</p>'
        });
}]);

viewsModule.controller('CountryDetailCtrl', ['$scope', 'countryDetails', 'cityDetails', 'neighbors', function($scope, countryDetails, cityDetails, neighbors) {
    $scope.country = countryDetails;

    for (var i = 0; i < cityDetails.length; i++) {
        if ($scope.country.capital == cityDetails[i].name) {
            var result = cityDetails[i].population;
            $scope.population = result;
        }
    }

    //Calculate Neighbors
    if (neighbors.length < 1) {
        $scope.noN = true;
        $scope.yesN = false;
    } else {
        $scope.neighbors = neighbors;
        $scope.noN = false;
        $scope.yesN = true;
    }


}]);
