/**
 * Created by muzikayise on 2016/11/13.
 */
import appService from '../app.service'

describe('appService', () => {

  var http, picsFile, service, actual;

  picsFile = {
    data: [
      {name: 'cool kid', description:'cool kid with mates', path:'img/pics/cool-kid.jpg' },
      {name: 'cool kid 2', description:'cool kid with mates', path:'img/pics/cool-kid2.jpg' },
      {name: 'cool kid 3', description:'cool kid with mates', path:'img/pics/cool-kid3.jpg' },
      {name: 'cool kid 4', description:'cool kid with mates', path:'img/pics/cool-kid4.jpg' },
    ]
  };

  beforeEach(() => {
    angular.mock.module(appService);

    angular.mock.inject(($httpBackend, _AppService_) => {
      http = $httpBackend;
      service = _AppService_;
      actual = null;
    })
  });

  it('should get data from json file', () => {
    http.expectGET('somefile.json').respond(200, picsFile);
    service.getPics('somefile.json').then((results) => {
      actual = results.data;
    });
    http.flush();

    expect(actual.data).toEqual(picsFile.data);
  });

});