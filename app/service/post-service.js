'use strict';

module.exports = ['$q', '$log', '$http', '$window', 'authService', postService];

function postService($q, $log, $http, $window, authService) {
  $log.debug('postService');

  let service = {};

  service.createPost = function(postedID, post) {
    $log.debug('postService.createPost()');

    return authService.getToken()
    .then( token  => {
      let url = `${__API_URL__}/api/posttopage/${postedID}`;
      let config = {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      console.log('POST', postedID);
      console.log(url);
      return $http.post(url, post, config);
    })
    .then( res => {
      $log.log('page post created', res.data);
      return res.data;
    })
    .catch( err => {
      $log.error('FAILED to post to page', err);
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

  service.fetchPagePosts = function(pageID) {
    $log.debug('postService.fetchPagePosts()');

    let url = `${__API_URL__}/api/pageposts/${pageID}`;
    let config = {
      headers: {
        Accept: 'application/json'
      }
    };

    return $http.get(url, config)
    .then( res => {
      $log.log('page posts retrieved');
      service.posts = res.data;
      return service.posts;
    })
    .catch( err => {
      $log.error('failed to retrieve page posts', err.message);

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

  service.fetchPostedPosts = function(profileID) {
    $log.debug('postService.fetchMyPosts()');

    let url = `${__API_URL__}/api/allmyposts/${profileID}`;
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
