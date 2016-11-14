import app from '../app';
import TweenMax from 'gsap';

describe('app', () => {

  describe('AppCtrl', () => {
    let ctrl, controller, pics, appService, q, rootScope, timeout, tweenMax;

    pics = {
     data: {
      data: [
        { name: 'cool kid', description: 'cool kid with mates', path: 'img/pics/cool-kid.jpg' },
        { name: 'cool kid 2', description: 'cool kid with mates', path: 'img/pics/cool-kid2.jpg' },
        { name: 'cool kid 3', description: 'cool kid with mates', path: 'img/pics/cool-kid3.jpg' },
        { name: 'cool kid 4', description: 'cool kid with mates', path: 'img/pics/cool-kid4.jpg' },
      ]
    }
  };

    beforeEach(() => {
      angular.mock.module(app);

      angular.mock.inject(($controller, $q, $rootScope, $timeout) => {
        controller = $controller;
        appService = jasmine.createSpyObj('AppService', ['getPics']);
        q = $q;
        rootScope = $rootScope;
        appService.getPics.and.returnValue(q.when(pics));
        timeout = $timeout;
      });
    });

    function initController() {
      ctrl = controller('AppCtrl', {
        'AppService': appService,
        '$timeout': timeout
      });
      rootScope.$digest();
    }

    describe('on init',() => {

      beforeEach(() => {
        initController();
      });

      it('should load pics', () => {
        expect(ctrl.pics).toEqual(pics);
      });

      it('should set load the 1st pic as currently displayed pic', () => {
        expect(ctrl.currentlyDisplayedPic).toEqual(pics.data.data[0]);
      });

      it('should set the next & previous pic details on init', () => {
        expect(ctrl.nextPicDetails).toEqual(pics.data.data[1]);
        expect(ctrl.previousPicDetails).toEqual(pics.data.data[3]);
      });

    });

    describe('scope functions', () => {

      beforeEach(() => {
        initController();
      });

      it('should set the currently displayed pic to next pic in the list', () => {
        ctrl.nextPic();
        timeout.flush();
        expect(ctrl.currentlyDisplayedPic).toEqual(pics.data.data[1]);
      });

      it('should set the currently displayed pic to the first pic, when on the last pic', () => {
        ctrl.currentlyDisplayedPic = pics.data.data[3];
        ctrl.nextPic();
        timeout.flush();
        expect(ctrl.currentlyDisplayedPic).toEqual(pics.data.data[0]);
      });

      it('should set the currently displayed pic to the last pic, when on the first pic', () => {
        ctrl.previousPic();
        timeout.flush();
        expect(ctrl.currentlyDisplayedPic).toEqual(pics.data.data[3]);
      });

      it('should set the currently displayed pic to previous pic', () => {
        ctrl.currentlyDisplayedPic = pics.data.data[3];
        ctrl.previousPic();
        timeout.flush();
        expect(ctrl.currentlyDisplayedPic).toEqual(pics.data.data[2]);
      });

      it('should do pic animation', () => {
        spyOn(TweenMax, 'to');
        spyOn(TweenMax, 'staggerFrom');
        ctrl.picAnimation();
        expect(TweenMax.to).toHaveBeenCalled();
        expect(TweenMax.staggerFrom).toHaveBeenCalled();
      });

      it('should set the next & previous pic details on nextPic', () => {
        ctrl.nextPic();
        timeout.flush();
        expect(ctrl.nextPicDetails).toEqual(pics.data.data[2]);
        expect(ctrl.previousPicDetails).toEqual(pics.data.data[0]);
      });

      it('should set the next & previous pic details on previousPic', () => {
        ctrl.previousPic();
        timeout.flush();
        expect(ctrl.nextPicDetails).toEqual(pics.data.data[0]);
        expect(ctrl.previousPicDetails).toEqual(pics.data.data[2]);
      });

    })
  });
});