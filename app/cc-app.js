angular.module('ccApp', ['ccAppViews', 'ngRoute', 'ngAnimate'])
    .config(function($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider.otherwise({
            redirectTo: '/'
        });
    })

    .run(function($rootScope, $location, $timeout) {
        // Then using the rootScoop.$on method to see if there was a routeChangeError(created by ngRoute if error in routing)
        $rootScope.$on('$routeChangeError', function() {
            //If there is a $routeChangeError, set the $location services .path function to the /error template
            $location.path("/error");
        });
        // When route Change Starts, set isLoading variable to true
        $rootScope.$on('$routeChangeStart', function() {
            $rootScope.isLoading = true;
        });
        // When route Change successful, wait a second and then set isLoading variable to false
        $rootScope.$on('$routeChangeSuccess', function() {
            //timout function is only needed to simulate a request to the server with a delay. Otherwise you would never see the effect
            $timeout(function() {
                $rootScope.isLoading = false;
            }, 600);
        });
    });
