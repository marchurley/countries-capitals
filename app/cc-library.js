// LIBRARY WITH ALL THE FACTORY CODE
angular.module('ccLibrary', [])

    //CONFIG FUNCTION TO PROPERLY CONFIGURE THE HEADER
    .config(function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
    })

    //AJAX CALL TO FIND THE COUNTRY WITH PROMISE RESPONSE AND CACHING (ONLY LOADED ONCE)
    .factory('ccFindCountry', ['$http', '$q', function($http, $q) {
        return function() {
            var url = "https://api.geonames.org/countryInfo?username=marcmarcmarc&type=json";
            return $http.get(url, {
                    cache: true
                })
                .then(function(response) {
                    return $q.when(response.data);
                });
        };
    }])

    //FINDING THE INDIVIDUAL COUNTRY BY RETURNING THE CCFINDCOUNTRY FUNCTION AND LOOPING THROUGH TO FIND THE COUNTRYCODE THAT MATCHES
    //WITH THE COUNTRY CODE FROM THE URL FROM COUNTRY_DETAIL.JS. RETURNS A PROMISE THAT HAS TO BE RESOLVED IN THE $ROUTEPROVIDER OF COUNTRY_DETAIL.JS
    .factory('ccFindIndividualCountry', ['ccFindCountry', function(ccFindCountry) {
        //countryCode argument == CountryCode from URL gets passed to function
        return function(countryCode) {
            return ccFindCountry()
                //response argument is the return response.data from ccFindCountry function
                .then(function(response) {
                    for (var i = 0; i < response.geonames.length; i++) {
                        if (countryCode == response.geonames[i].countryCode) {
                            var result = response.geonames[i];
                            return result;
                        }
                    }
                });
        };
    }])

    //AJAX CALL TO FIND THE CAPITAL. RETURNS A PROMISE THAT HAS TO BE RESOLVED IN THE $ROUTEPROVIDER OF COUNTRY_DETAIL.JS
    .factory('ccFindCapital', ['$http', '$q', function($http, $q) {
        //countryCode argument == CountryCode from URL gets passed to function
        return function(countryCode) {
            var url = "https://api.geonames.org/searchJSON?";
            //set request parameters for API
            var request = {
                //name_equals: cityName,
                country: countryCode,
                username: "marcmarcmarc",
            };
            //$http function to api with above specified parameters
            return $http({
                url: url,
                params: request,
            })
            //response argument is the return response from $http call
            .then(function(response) {
                return $q.when(response.data.geonames);
            });
        };
    }])

    //AJAX CALL TO FIND THE NEIGHBOURS. RETURNS A PROMISE THAT HAS TO BE RESOLVED IN THE $ROUTEPROVIDER OF COUNTRY_DETAIL.JS
    .factory('findNeighbors', ['$http', '$q', function($http, $q) {
        //countryCode argument == CountryCode from URL gets passed to function
        return function(countryCode) {
            var url = "https://api.geonames.org/neighboursJSON?";
            //set request parameters for API
            var request = {
                country: countryCode,
                username: "marcmarcmarc",
            };
            //$http function to api with above specified parameters
            return $http({
                  url: url,
                  params: request,
            })
            //response argument is the return response from $http call
            .then(function(response) {
                  return $q.when(response.data.geonames);
            });
        };
    }]);
