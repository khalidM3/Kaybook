'use strict';

module.exports = ['$q', '$log', '$http', 'Upload', 'authService', picService];

function picService($q, $log, $http, Upload, authService) {
  $log.debug('picService');

  let service = {};

  service.uploadProfilePic = function(profileData, picData) {
    $log.debug('service.uploadProfilePic');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/profile/${profileData._id}/pic`;
      let headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      };

      return Upload.upload({
        url,
        headers,
        method: 'POST',
        data: {
          file: picData
        }
      });
    })
    .then( res => {
      $log.log('RESPONSE:', res, 'picdata', picData);
    })
    .catch( err => {
      $log.error('DIDNT UPLOAD THE PIC',err);
      return $q.reject(err);
    });
  };

  service.deleteProfilePic = function(profileData, picData) {
    $log.debug('picService.deleteProfilePic');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/profile/${profileData._id}/${picData._id}`;
      let config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      return $http.delete(url, config);
    })
    .then( res => {
      $log.log('Profile pic deleted.');
    })
    .catch( err => {
      $log.err(err.message);
      return $q.reject(err);
    });
  };

  service.uploadPostPic = function(postData, picData) {
    $log.debug('service.uploadPostPic');
    
    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/post/${postData._id}/pic`;
      let headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      };

      return Upload.upload({
        url,
        headers,
        method: 'POST',
        data: {
          file: picData
        }
      });
    })
    .then( res => {
      $log.log('RESPONSE:', res, 'picdata', picData);
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.deletePostPic = function(postData) {
    $log.debug('picService.deletePostPic');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/post/${postData._id}/pic`;
      let config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      return $http.delete(url, config);
    })
    .then( res => {
      $log.log('Post pic deleted.');
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  return service;
}