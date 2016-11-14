import app from '../app';

describe('app', () => {

  describe('AppCtrl', () => {
    let ctrl, controller, pics, appService, q, rootScope;

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

      angular.mock.inject(($controller, $q, $rootScope) => {
        controller = $controller;
        appService = jasmine.createSpyObj('AppService', ['getPics']);
        q = $q;
        rootScope = $rootScope;
        appService.getPics.and.returnValue(q.when(pics));
      });
    });

    function initController() {
      ctrl = controller('AppCtrl', {
        'AppService': appService
      });
      rootScope.$digest();
    }

    describe('on init',() => {

      it('should load pics', () => {
        initController();
        expect(ctrl.pics).toEqual(pics);
      });

      it('should set load the 1st pic as currently displayed pic', () => {
        initController();
        expect(ctrl.currentlyDisplayedPic).toEqual(pics.data.data[0]);
      });

    });

    describe('scope functions', () => {

      beforeEach(() => {
        initController();
      });

      it('should set the currently displayed pic to next pic in the list', () => {
        ctrl.nextPic();
        expect(ctrl.currentlyDisplayedPic).toEqual(pics.data.data[1]);
      });

      it('should set the currently displayed pic to the first pic, when on the last pic', () => {
        ctrl.currentlyDisplayedPic = pics.data.data[3];
        ctrl.nextPic();
        expect(ctrl.currentlyDisplayedPic).toEqual(pics.data.data[0]);
      });

      it('should set the currently displayed pic to the last pic, when on the first pic', () => {
        ctrl.previousPic();
        expect(ctrl.currentlyDisplayedPic).toEqual(pics.data.data[3]);
      });

      it('should set the currently displayed pic to previous pic', () => {
        ctrl.currentlyDisplayedPic = pics.data.data[3];
        ctrl.previousPic();
        expect(ctrl.currentlyDisplayedPic).toEqual(pics.data.data[2]);
      });

    })
  });
});