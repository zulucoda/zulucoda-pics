import angular from 'angular';
import appService from './app.service'

import 'bootstrap/dist/css/bootstrap.css';
import './../style/app.css';

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
    app.currentlyDisplayedPic = app.pics.data.data[0];
  });

}

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [appService])
  .directive('app', app)
  .controller('AppCtrl', AppCtrl);

export default MODULE_NAME;