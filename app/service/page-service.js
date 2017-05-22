'use strict';

module.exports = ['$q', '$log', '$http', '$window', 'authService', pageService];

function pageService($q, $log, $http, $window, authService) {
  $log.debug('pageService');

  let service = {};

  service.createPage = function(page) {
    $log.debug('pageService.createPage');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/page`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.post(url, page, config);
    })
    .then( res => {
      $log.log('page created');
      let page = res.data;
      return page;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.fetchPage = function(pageID) {
    $log.debug('pageService.fetchProfile');

    let url = `${__API_URL__}/api/page/${pageID}`;
    let config = {
      headers: {
        Accept: 'application/json'
      }
    };

    return $http.get(url, config)
    .then( res => {
      $log.log('Page Retrieved', res);
      let page = res.data;
      return page;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.fetchPagesByPID = function(profileID) {
    $log.debug('pageService.fetchPagesByPID');

    let url = `${__API_URL__}/api/pagebypid/${profileID}`;
    let config = {
      headers: {
        Accept: 'application/json'
      }
    };

    return $http.get(url, config)
    .then( res => {
      $log.log('Pages Retrieved', res);
      let page = res.data;
      return page;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.editPage = function(pageID, pageData) {
    $log.debug('profileService.editProfile');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/profile/${pageID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      return $http.put(url, pageData, config);
    })
    .then( res => {
      $log.log('Page edited successfully.');
      let page = res.data;
      return page;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  return service;

}