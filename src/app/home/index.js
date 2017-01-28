/**
 * Created by brandon14 on 1/28/17.
 */
import angular from 'angular';
import uirouter from 'angular-ui-router';

// import home routing and controller
import routing from './home.routes';
import HomeController from './home.controller';

// Import module specific style
import './home.scss';

export default angular.module('app.home', [uirouter])
 .config(routing)
 .controller('HomeController', HomeController)
 .name;
