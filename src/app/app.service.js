/**
 * Created by muzikayise on 2016/11/13.
 */
import angular from 'angular';

function AppService($http) {

  return {
    getPics : (fileName) => {
      return $http.get(fileName).success((response) => {
        return response;
      });
    }
  }
}

export default angular.module('app.service', [])
  .service('AppService', AppService)
  .name;