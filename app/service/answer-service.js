'use strict';

module.exports = ['$q', '$log', '$window', '$http', 'authService', answerService];

function answerService($q, $log, $window, $http, authService){
  $log.debug('answerService');

  let service = {};

  service.createAnswer = function(forumID, answerData){
    $log.debug('service.createAnswer');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/answer/${forumID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.post(url, answerData, config);
    })
    .then( res => {
      $log.log('created an answer');
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to create an answer',err);
      return $q.reject(err);
    });
  };


  return service;

}