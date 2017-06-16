'use strict';

module.exports = ['$q', '$log', '$window', '$http', 'authService', pollService];

function pollService($q, $log, $window, $http, authService){
  $log.debug('pollService');

  let service = {};

  service.createPoll = function(pageID, pollData){
    $log.debug('service.createPoll');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/pagepoll/${pageID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.post(url, pollData, config);
    })
    .then( res => {
      $log.log('created a poll');
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to create a poll',err);
      return $q.reject(err);
    });
  };

  service.createPollFeed = function(pageID, pollData){
    $log.debug('service.createPollFeed');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/pollfeed/${pageID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.post(url, pollData, config);
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

  service.fetchPoll = function(forumID){
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

  service.fetchPollFeed = function(pageID){
    $log.debug('service.fetchForumFeed');

    let url = `${__API_URL__}/api/pollfeed/${pageID}`;
    let config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'aplication/json'
      }
    };

    return $http.get(url, config)
    .then( res => {
      $log.log('fetched poll feed', res.data);
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to fetch poll feed',err);
      return $q.reject(err);
    });
  };

  service.fetchProfilePolls = function(forumID){
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

  service.fetchPagePolls = function(forumID){
    $log.debug('service.fetchPageForums');

    let url = `${__API_URL__}/api/pagepolls/${forumID}`;
    let config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'aplication/json'
      }
    };

    return $http.get(url, config)
    .then( res => {
      $log.log('fetched page polls', res.data);
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to fetch page polls',err);
      return $q.reject(err);
    });
  };

  service.fetchPollAns= function(forumID){
    $log.debug('service.fetchForumAns');

    let url = `${__API_URL__}/api/pollans/${forumID}`;
    let config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'aplication/json'
      }
    };

    return $http.get(url, config)
    .then( res => {
      $log.log('fetched poll and answers', res.data);
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to fetch poll and answers',err);
      return $q.reject(err);
    });
  };

  service.deletePoll = function(fpollID){
    $log.debug('service.deletePoll');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/poll/deletepoll/${fpollID}`;
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
      $log.log('deleted a poll');
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to delete a poll',err);
      return $q.reject(err);
    });
  };


  return service;
}