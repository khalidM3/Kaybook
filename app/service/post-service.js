'use strict';

module.exports = ['$q', '$log', '$http', '$window', 'authService', postService];

function postService($q, $log, $http, $window, authService) {
  $log.debug('postService');

  let service = {};

  service.createPost = function(postedPID, post) {
    $log.debug('postService.createPost()');

    return authService.getToken()
    .then( token  => {
      let url = `${__API_URL__}/api/post/${postedPID}`;
      let config = {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      console.log('POST', postedPID);
      return $http.post(url, post, config);
    })
    .then( res => {
      $log.log('post created', res.data);
      return res.data.post;
    })
    .catch( err => {
      $log.error('FAILED', err);
      return $q.reject(err);
    });
  };

  service.fetchPost = function(postID) {
    $log.debug('postService.fetchMyPosts()');

    let url = `${__API_URL__}/api/post/${postID}`;
    let config = {
      headers: {
        Accept: 'application/json'
      }
    };

    return $http.get(url, config)
    .then( post => {
      $log.log('post retrieved', post);
      return post;
    })
    .catch( err => {
      $log.error(err.message, 'FAILED TO RETRIEVE');
      return $q.reject(err);
    });
  };

  service.fetchPosts = function() {
    $log.debug('postService.fetchPosts()');

    let url = `${__API_URL__}/api/allposts`;
    let config = {
      headers: {
        Accept: 'application/json'
      }
    };

    return $http.get(url, config)
    .then( res => {
      $log.log('posts retrieved');
      service.posts = res.data;
      return service.posts;
    })
    .catch( err => {
      $log.error('failed to retrieve posts', err.message);

      return $q.reject(err);
    });
  };

  service.fetchMyPosts = function(profileID) {
    $log.debug('postService.fetchMyPosts()');

    let url = `${__API_URL__}/api/allposts/${profileID}`;
    let config = {
      headers: {
        Accept: 'application/json'
      }
    };

    return $http.get(url, config)
    .then( res => {
      $log.log('posts retrieved');
      service.posts = res.data;
      return service.posts;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.updatePost = function(postID, postData) {
    $log.debug('postService.updatePost');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/post/${postID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.put(url, postData, config);
    })
    .then( res => {
      $log.log('posts updated');
      return res.data;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.deletePost = function(postID) {
    $log.debug('postService.deletePost');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/post/${postID}`;
      let config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      return $http.delete(url, config);
    })
    .then( res => {
      $log.log('posts deleted');
      return res.data;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  return service;
}
