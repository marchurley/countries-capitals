//CONFIG WITH $ROUTEPROVIDER TO SET THE ROUTING AND TEMPLATES AND RESOLVE
viewsModule.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when("/countries/:country", {
            templateUrl: "./country_detail/country_detail.html",
            controller: 'CountryDetailCtrl',
            //Resolve: Code stops until resolved. Returns the promises from the factory codes in the library that can be used in the controller
            resolve: {
                //countryDetails receives the promise from ccFindIndividualCountry which is an object of the individual country based on countrycode from url
                countryDetails: ['ccFindIndividualCountry', '$route', function(ccFindIndividualCountry, $route) {
                    var countryCode = $route.current.params.country;
                    //if country code is longer that 2 characters, you get redirected to error page
                    if (countryCode.length > 2) {
                        $location.path('/error');
                        return;
                    }
                    //otherwise the ccFindIndividualCountry is run that returns the promise
                    return ccFindIndividualCountry($route.current.params.country);
                }],
                //cityDetails receives the promise from ccFindCapital which is an object with the capital data
                cityDetails: ['ccFindCapital', '$route', function(ccFindCapital, $route) {
                    return ccFindCapital($route.current.params.country);
                }],
                //neighbors receives the promise from findNeighbors which is an object with the neighbors data
                neighbors: ['findNeighbors', '$route', function(findNeighbors, $route) {
                    return findNeighbors($route.current.params.country);
                }]
            }
        })
        .when('/error', {
            template: '<h1>Error Page Not Found</h1><p>Please try another country</p>'
        });
}]);

//CONTROLLER FOR COUNTRY_DETAIL PAGE
viewsModule.controller('CountryDetailCtrl', ['$scope', 'countryDetails', 'cityDetails', 'neighbors', function($scope, countryDetails, cityDetails, neighbors) {
    //bind the countryDetails promise from line 9 to the $scope.country to be used in country_detail.html
    $scope.country = countryDetails;

    //cityDetails promise from line 20 - Loop through to find the capital that matches the capital from countryDetails on line 9
    //and then bind it to the $scope.population to be used in country_detail.html
    for (var i = 0; i < cityDetails.length; i++) {
        if ($scope.country.capital == cityDetails[i].name) {
            var result = cityDetails[i].population;
            $scope.population = result;
        }
    }

    //bind neighbors promise from line 24 to $scope.neighbours to be used in country_detail.html
    //If there are no neighbors, set $scope.noN to true, which will active ng-if on country_detail.html to show text
    if (neighbors.length < 1) {
        $scope.noN = true;
        $scope.yesN = false;
    } else {
        $scope.neighbors = neighbors;
        $scope.noN = false;
        $scope.yesN = true;
    }
}]);
