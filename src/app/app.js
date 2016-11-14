import angular from 'angular';
import appService from './app.service'
import _ from 'lodash';
import ngAnimate from 'angular-animate';
import TweenMax from 'gsap';
import tooltip from 'angular-ui-bootstrap/src/tooltip';

import 'bootstrap/dist/css/bootstrap.css';
import './../style/app.css';

let app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app'
  }
};

function AppCtrl (AppService, $timeout) {
  var app = this;

  app.pics = [];

  AppService.getPics('data/pics.json').then((results) => {
    app.pics = results;
    app.currentlyDisplayedPic = app.pics.data.data[0];
    app.nextPicDetails = app.pics.data.data[getPositionOfNextPic(1)];
    app.previousPicDetails = app.pics.data.data[getPositionOfPreviousPic(1)];
  });

  function getPositionOfNextPic (addBy) {
    let pos = _.findIndex(app.pics.data.data, app.currentlyDisplayedPic) + addBy;
    if (pos >= app.pics.data.data.length) {
      pos = 0;
    }
    return pos;
  }

  function getPositionOfPreviousPic (addBy) {
    let pos = _.findIndex(app.pics.data.data, app.currentlyDisplayedPic) - addBy;
    if (pos <= -1) {
      pos = app.pics.data.data.length - addBy;
    }
    return pos;
  }

  function setNextDetails (current) {
    app.previousPicDetails = current;
    app.nextPicDetails = app.pics.data.data[getPositionOfNextPic(2)];
  }

  function setPreviousDetails (current) {
    app.nextPicDetails = current;
    app.previousPicDetails = app.pics.data.data[getPositionOfPreviousPic(2)];
  }

  //TODO: find a better way to do animation
  app.picAnimation = () => {
    TweenMax.to('#pic', 1.2, {opacity: 0, onComplete: () => {
      TweenMax.to('#pic', 0.5, {opacity: 1});
    }});
    TweenMax.staggerFrom('section div', 1.2, {
      scale: 0.9,
      opacity: 0,
      delay: 0.5,
      onComplete: () => {
        TweenMax.to('section div', 0.5, {opacity: 0.5, scale: 1});
      }
    }, 0.1);
  };

  app.nextPic = () => {
    $timeout(() => {
      setNextDetails(app.currentlyDisplayedPic);
      app.currentlyDisplayedPic = app.pics.data.data[getPositionOfNextPic(1)];
    }, 1000);
  };

  app.previousPic = () => {
    $timeout(() => {
      setPreviousDetails(app.currentlyDisplayedPic);
      app.currentlyDisplayedPic = app.pics.data.data[getPositionOfPreviousPic(1)];
    }, 1000);
  };

}

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [appService, ngAnimate, tooltip])
  .directive('app', app)
  .controller('AppCtrl', AppCtrl);

export default MODULE_NAME;