/**
 * Created by brandon14 on 1/28/17.
 */
import angular from 'angular';
import uirouter from 'angular-ui-router';
import ngMaterial from 'angular-material';

// Import our components
import config from './app.config';
import home from './home';

// Import our css
import 'angular-material/angular-material.css';
import 'font-awesome/css/font-awesome.css';
import 'flat-social-icons/flat-icons.css';
// App specific css
import '../style/app.scss';

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [ngMaterial, uirouter, home]).config(config);

export default MODULE_NAME;