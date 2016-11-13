import angular from 'angular';
import appService from './app.service'

import 'bootstrap/dist/css/bootstrap.css';

let app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app'
  }
};

function AppCtrl (AppService) {
  var app = this;

  app.pics = [];

  AppService.getPics('data/pics.json').then((results) => {
    app.pics = results;
  });

}

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, ['app.service'])
  .directive('app', app)
  .controller('AppCtrl', AppCtrl);

export default MODULE_NAME;