'use strict';

module.exports = ['$q', '$log', '$window', '$http', 'authService', roomService];

function roomService($q, $log, $window, $http, authService){
  $log.debug('roomService');

  let service = {};

  service.createRoom = function(){
    $log.debug('service.createPoll');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/room/newroom`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.get(url, config);
    })
    .then( res => {
      $log.log('created a room');
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to create a room',err);
      return $q.reject(err);
    });
  };

  service.fetchMyRooms = function(){
    $log.debug('service.fetchMyRooms');


    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/room/myrooms`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.get(url, config);
    })
    .then( res => {
      $log.log('fetched a room');
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to fetch a room',err);
      return $q.reject(err);
    });
  };

  service.fetchRoom = function(roomID){
    $log.debug('service.fetchMyRooms');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/room/getroom/${roomID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.get(url, config);
    })
    .then( res => {
      $log.log('fetched a room');
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to fetch a room',err);
      return $q.reject(err);
    });
  };


  service.addMembers = function(roomID, memberData){
    $log.debug('service.addMembers');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/room/addmembers/${roomID}`;
      let config = {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.put(url, memberData , config);
    })
    .then( res => {
      $log.log('added members');
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to add members',err);
      return $q.reject(err);
    });
  };

  service.removeMembers = function(roomID, memberData){
    $log.debug('service.removeMembers');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/room/removemembers/${roomID}`;
      let config = {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.put(url, memberData , config);
    })
    .then( res => {
      $log.log('removed members');
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to remove members',err);
      return $q.reject(err);
    });
  };

  return service;
}