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

  service.createFeed = function(pageID, post) {
    $log.debug('postService.createFeed()');

    return authService.getToken()
    .then( token  => {
      let url = `${__API_URL__}/api/posttofeed/${pageID}`;
      let config = {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      console.log('POST', pageID);
      console.log(url);
      return $http.post(url, post, config);
    })
    .then( res => {
      $log.log('feed post created', res.data);
      return res.data;
    })
    .catch( err => {
      $log.error('FAILED to post to feed', err);
      return $q.reject(err);
    });
  };

  service.createProfilePost = function(post) {
    $log.debug('postService.createPost()');

    return authService.getToken()
    .then( token  => {
      let url = `${__API_URL__}/api/posttoprofile`;
      let config = {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      console.log(url);
      return $http.post(url, post, config);
    })
    .then( res => {
      $log.log('profile post created', res.data);
      return res.data;
    })
    .catch( err => {
      $log.error('FAILED to post to profile', err);
      return $q.reject(err);
    });
  };

  service.fetchPost = function(postID) {
    $log.debug('postService.fetchPosts()');

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

  service.fetchPostComments = function(postID) {
    $log.debug('postService.fetchMyPosts()');

    let url = `${__API_URL__}/api/post/comments/${postID}`;
    let config = {
      headers: {
        Accept: 'application/json'
      }
    };

    return $http.get(url, config)
    .then( res => {
      $log.log('post retrieved', res);
      return res.data;
    })
    .catch( err => {
      $log.error(err.message, 'FAILED TO RETRIEVE');
      return $q.reject(err);
    });
  };
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//            POLL

  service.vote = function(postID, choiceID ) {
    $log.debug('postService.vote()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/post/vote/${postID}/${choiceID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.get(url, config);
    })
    .then( res => {
      $log.log('post retrieved', res);
      return res.data;
    })
    .catch( err => {
      $log.error(err.message, 'FAILED TO RETRIEVE');
      return $q.reject(err);
    });
  };


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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

  service.fetchPageFeed = function(pageID) {
    $log.debug('postService.fetchPageFeed()');

    let url = `${__API_URL__}/api/pagefeed/${pageID}`;
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

  service.fetchMyPagePosts = function(profileID) {
    $log.debug('postService.fetchMyPagePosts()');

    let url = `${__API_URL__}/api/mypageposts/${profileID}`;
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

  service.fetchMyPosts = function() {
    $log.debug('postService.fetchMyPosts()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/allmyposts`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.get(url, config);
    })
    .then( res => {
      $log.log('posts retrieved', res);
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to fetch posts',err.message);
      return $q.reject(err);
    });
  };

  service.fetchFriendsPosts = function() {
    $log.debug('postService.fetchFriendsPosts()');

    return authService.getToken()
    .then( token  => {
      let url = `${__API_URL__}/api/friendsposts`;
      let config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      console.log(url);
      return $http.get(url, config);
    })
    .then( res => {
      $log.log('fetched friends posts', res.data);
      return res.data;
    })
    .catch( err => {
      $log.error('FAILED to fetch friends posts', err);
      return $q.reject(err);
    });
  };

  service.fetchTimeline = function() {
    $log.debug('postService.fetchTimeline()');

    return authService.getToken()
    .then( token  => {
      let url = `${__API_URL__}/api/timeline`;
      let config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      console.log(url);
      return $http.get(url, config);
    })
    .then( res => {
      $log.log('fetched timeline posts', res.data);
      return res.data;
    })
    .catch( err => {
      $log.error('FAILED to fetch timeline posts', err);
      return $q.reject(err);
    });
  };



  service.fetchTimePosts = function(profileID) {
    $log.debug('postService.fetchTimePosts()');

    let url = `${__API_URL__}/api/timelineposts/${profileID}`;
    let config = {
      headers: {
        Accept: 'application/json',
      }
    };
    console.log(url);
    return $http.get(url, config)
    .then( res => {
      $log.log('fetched timeline posts', res.data);
      return res.data;
    })
    .catch( err => {
      $log.error('FAILED to fetch timeline posts', err);
      return $q.reject(err);
    });
  };

  service.fetchJoinedPosts = function() {
    $log.debug('postService.fetchJoinedPosts()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/joinedposts`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.get(url, config);
    })
    .then( res => {
      $log.log('post retrieved', res);
      return res.data;
    })
    .catch( err => {
      $log.error(err.message, 'FAILED TO RETRIEVE');
      return $q.reject(err);
    });
  };

  service.fetchJoinedFeed = function() {
    $log.debug('postService.fetchJoinedFeed()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/joinedfeed`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.get(url, config);
    })
    .then( res => {
      $log.log('feed retrieved', res);
      return res.data;
    })
    .catch( err => {
      $log.error(err.message, 'FAILED to retreve feed');
      return $q.reject(err);
    });
  };

  service.fetchAllPosts = function() {
    $log.debug('postService.fetchAllPosts()');

    let url = `${__API_URL__}/api/allposts`;
    let config = {
      headers: {
        Accept: 'application/json',
      }
    };
    console.log(url);
    return $http.get(url, config)
    .then( res => {
      $log.log('fetched all posts', res.data);
      return res.data;
    })
    .catch( err => {
      $log.error('FAILED to fetch all posts', err);
      return $q.reject(err);
    });
  };

  service.likePost = function(postID) {
    $log.debug('postService.likePost()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/likepost/${postID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      return $http.get(url, config);
    })
    .then( res => {
      $log.log('post liked', res);
      return res.data;
    })
    .catch( err => {
      $log.error(err.message, 'FAILED to like post');
      return $q.reject(err);
    });
  };

  service.unLikePost = function(postID) {
    $log.debug('postService.unLikePost()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/unlikepost/${postID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      return $http.get(url, config);
    })
    .then( post => {
      $log.log('post unliked', post);
      return post;
    })
    .catch( err => {
      $log.error(err.message, 'FAILED to unlike post');
      return $q.reject(err);
    });
  };

  service.dislikePost = function(postID) {
    $log.debug('postService.dislikePost()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/dislikepost/${postID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      return $http.get(url, config);
    })
    .then( res => {
      $log.log('post liked', res);
      return res.data;
    })
    .catch( err => {
      $log.error(err.message, 'FAILED to dislike post');
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
