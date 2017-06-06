'use strict';

module.exports = ['$q', '$log', '$window', '$http', 'authService', choiceService];

function choiceService($q, $log, $window, $http, authService){
  $log.debug('choiceService');

  let service = {};

  service.createChoice = function(pollID, choiceData){
    $log.debug('service.createChoice');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/pollchoice/${pollID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.post(url, choiceData, config);
    })
    .then( res => {
      $log.log('created a choice');
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to create a choice',err);
      return $q.reject(err);
    });
  };

  service.vote = function(pollID, choiceID){
    $log.debug('service.fetchComment');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/vote/${pollID}/${choiceID}`;
      let config = {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'aplication/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.get(url, config);
    })
    .then( res => {
      $log.log('fetched one comment');
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to fetch ',err);
      return $q.reject(err);
    });
  };


  return service;

}