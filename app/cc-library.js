angular.module('ccLibrary', [])

    //config function to properly configure the header//
    .config(function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
    })

    .factory('ccFindCountry', ['$http', '$q', function($http, $q) {
        return function() {
            var url = "http://api.geonames.org/countryInfo?username=marcmarcmarc&type=json";
            return $http.get(url, {
                    cache: true
                })
                .then(function(response) {
                    return $q.when(response.data);
                });
        };
    }])

    .factory('ccFindIndividualCountry', ['ccFindCountry', function(ccFindCountry) {
        return function(countryCode) {
            return ccFindCountry()
                .then(function(country) {
                    for (var i = 0; i < country.geonames.length; i++) {
                        if (countryCode == country.geonames[i].countryCode) {
                            var result = country.geonames[i];
                            return result;
                        }
                    }
                });
        };
    }])

    .factory('ccFindCapital', ['$http', '$q', function($http, $q) {
        return function(cityName) {
            var url = "http://api.geonames.org/searchJSON?";
            //set request parameters for flickr API //
            var request = {
                //name_equals: cityName,
                country: cityName,
                username: "marcmarcmarc",
            };

            //$http function to flickr url with above specified parameters //
            return $http({
                    url: url,
                    params: request,
                })
                .then(function(response) {
                    return $q.when(response.data.geonames);
                });
        };
    }])

    .factory('findNeighbors', ['$http', '$q', function($http, $q) {
        return function(countryCode) {
            var url = "http://api.geonames.org/neighboursJSON?";
            //set request parameters for flickr API //
            var request = {
                //name_equals: cityName,
                country: countryCode,
                username: "marcmarcmarc",
            };

            //$http function to flickr url with above specified parameters //
            return $http({
                    url: url,
                    params: request,
                })
                .then(function(response) {
                    return $q.when(response.data.geonames);
                });
        };
    }]);
