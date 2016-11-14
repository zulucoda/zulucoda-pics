import angular from 'angular';
import appService from './app.service'
import _ from 'lodash';

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

  function getPositionOfNextPic () {
    let pos = _.findIndex(app.pics.data.data, app.currentlyDisplayedPic) + 1;
    if (pos >= app.pics.data.data.length) {
      pos = 0;
    }
    return pos;
  }

  function getPositionOfPreviousPic () {
    let pos = _.findIndex(app.pics.data.data, app.currentlyDisplayedPic) - 1;
    if (pos <= -1) {
      pos = app.pics.data.data.length - 1;
    }
    return pos;
  }

  app.nextPic = () => {
    app.currentlyDisplayedPic = app.pics.data.data[getPositionOfNextPic()];
  };

  app.previousPic = () => {
    app.currentlyDisplayedPic = app.pics.data.data[getPositionOfPreviousPic()];
  };

}

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [appService])
  .directive('app', app)
  .controller('AppCtrl', AppCtrl);

export default MODULE_NAME;