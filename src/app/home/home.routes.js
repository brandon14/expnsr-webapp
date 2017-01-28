/**
 * Created by brandon14 on 1/28/17.
 */
routing.$inject = ['$stateProvider'];

export default function routing($stateProvider) {
  /**
   * Base home route
   *
   * @type {{name: string, url: string, template: *, controller: string, controllerAs: string}}
   */
  var homeState = {
    name: 'Home',
    url: '/',
    template: require('./home.html'),
    controller: 'HomeController',
    controllerAs: 'home'
  };

  $stateProvider.state(homeState);
}
