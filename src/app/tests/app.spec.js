import app from '../app';

describe('app', () => {

  describe('AppCtrl', () => {
    let ctrl, controller, pics, appService, q, rootScope;

    pics = [
      {name: 'cool kid', description:'cool kid with mates', path:'img/pics/cool-kid.jpg' },
      {name: 'cool kid 2', description:'cool kid with mates', path:'img/pics/cool-kid2.jpg' },
      {name: 'cool kid 3', description:'cool kid with mates', path:'img/pics/cool-kid3.jpg' },
      {name: 'cool kid 4', description:'cool kid with mates', path:'img/pics/cool-kid4.jpg' },
    ];

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

    // it('should contain the starter url', () => {
    //   expect(ctrl.url).toBe('https://github.com/preboot/angular-webpack');
    // });

    describe('on init',() => {

      it('should load pics', () => {
        initController();
        expect(ctrl.pics).toEqual(pics);
      });

    })
  });
});