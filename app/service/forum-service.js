'use strict';

module.exports = ['$q', '$log', '$window', '$http', 'authService', forumService];

function forumService($q, $log, $window, $http, authService){
  $log.debug('forumService');

  let service = {};

  service.createForum = function(postID, forumData){
    $log.debug('service.createForum');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/forum/${postID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.post(url, forumData, config);
    })
    .then( res => {
      $log.log('created a forum');
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to create a forum',err);
      return $q.reject(err);
    });
  };

  service.fetchForum = function(forumID){
    $log.debug('service.fetchForum');

    let url = `${__API_URL__}/api/forum/${forumID}`;
    let config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'aplication/json'
      }
    };

    return $http.get(url, config)
    .then( res => {
      $log.log('fetched one forum', res.data);
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to fetch form',err);
      return $q.reject(err);
    });
  };

  service.fetchProfileForums = function(forumID){
    $log.debug('service.fetchProfileForums');

    let url = `${__API_URL__}/api/profileforums/${forumID}`;
    let config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'aplication/json'
      }
    };

    return $http.get(url, config)
    .then( res => {
      $log.log('fetched profile forums', res.data);
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to fetch profile forums',err);
      return $q.reject(err);
    });
  };

  service.fetchPageForums = function(forumID){
    $log.debug('service.fetchPageForums');

    let url = `${__API_URL__}/api/pageforums/${forumID}`;
    let config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'aplication/json'
      }
    };

    return $http.get(url, config)
    .then( res => {
      $log.log('fetched page forums', res.data);
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to fetch page forums',err);
      return $q.reject(err);
    });
  };

  return service;
}