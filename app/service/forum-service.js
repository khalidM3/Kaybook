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

  service.createForumFeed = function(postID, forumData){
    $log.debug('service.createForumFeed');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/forumfeed/${postID}`;
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
      $log.log('created a forum feed');
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to create a forum feed',err);
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

  service.fetchForumFeed = function(pageID){
    $log.debug('service.fetchForumFeed');

    let url = `${__API_URL__}/api/forumfeed/${pageID}`;
    let config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'aplication/json'
      }
    };

    return $http.get(url, config)
    .then( res => {
      $log.log('fetched forum feed');
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to fetch form feed',err);
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

  service.fetchForumAns= function(forumID){
    $log.debug('service.fetchForumAns');

    let url = `${__API_URL__}/api/forumans/${forumID}`;
    let config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'aplication/json'
      }
    };

    return $http.get(url, config)
    .then( res => {
      $log.log('fetched forum and answers', res.data);
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to fetch form and answers',err);
      return $q.reject(err);
    });
  };

  service.deleteForum = function(forumID){
    $log.debug('service.deleteForum');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/forum/deleteforum/${forumID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.delete(url, config);
    })
    .then( res => {
      $log.log('deleted a forum');
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to delete a forum',err);
      return $q.reject(err);
    });
  };

  service.deleteForumFeed = function(forumID){
    $log.debug('service.deleteForum');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/forum/deleteforumfeed/${forumID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.delete(url, config);
    })
    .then( res => {
      $log.log('deleted a forum feed');
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to delete a forum feed',err);
      return $q.reject(err);
    });
  };


  return service;
}