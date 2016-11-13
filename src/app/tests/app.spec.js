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

    })
  });
});