/**
 * Created by brandon14 on 1/28/17.
 */
config.$inject = ['$urlRouterProvider', '$locationProvider', '$mdIconProvider','$mdThemingProvider'];

export default function config($urlRouterProvider, $locationProvider, $mdIconProvider, $mdThemingProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

  // Set up material theme
  $mdThemingProvider.theme('default')
                    .primaryPalette('deep-orange')
                    .accentPalette('light-blue');
  $mdThemingProvider.enableBrowserColor({
    theme: 'default'
  });
}
