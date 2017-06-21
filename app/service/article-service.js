'use strict';

module.exports = ['$q', '$log', '$window', '$http', 'authService', articleService];

function articleService($q, $log, $window, $http, authService){
  $log.debug('articleService');

  let service = {};

  service.createArticle = function(postID, articleData){
    $log.debug('service.createArticle');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/article/${postID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.post(url, articleData, config);
    })
    .then( res => {
      $log.log('created a article');
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to create a article',err);
      return $q.reject(err);
    });
  };

  service.createArticleFeed = function(postID, articleData){
    $log.debug('service.createArticleFeed');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/articlefeed/${postID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.post(url, articleData, config);
    })
    .then( res => {
      $log.log('created a article feed');
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to create a article feed',err);
      return $q.reject(err);
    });
  };

  service.fetchArticle = function(articleID){
    $log.debug('service.fetchArticle');

    let url = `${__API_URL__}/api/article/${articleID}`;
    let config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'aplication/json'
      }
    };

    return $http.get(url, config)
    .then( res => {
      $log.log('fetched one article', res.data);
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to fetch form',err);
      return $q.reject(err);
    });
  };

  service.fetchArticleFeed = function(pageID){
    $log.debug('service.fetchArticleFeed');

    let url = `${__API_URL__}/api/articlefeed/${pageID}`;
    let config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'aplication/json'
      }
    };

    return $http.get(url, config)
    .then( res => {
      $log.log('fetched article feed');
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to fetch form feed',err);
      return $q.reject(err);
    });
  };

  service.fetchProfileArticles = function(articleID){
    $log.debug('service.fetchProfileArticles');

    let url = `${__API_URL__}/api/profilearticles/${articleID}`;
    let config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'aplication/json'
      }
    };

    return $http.get(url, config)
    .then( res => {
      $log.log('fetched profile articles', res.data);
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to fetch profile articles',err);
      return $q.reject(err);
    });
  };

  service.fetchPageArticles = function(articleID){
    $log.debug('service.fetchPageArticles');

    let url = `${__API_URL__}/api/pagearticles/${articleID}`;
    let config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'aplication/json'
      }
    };

    return $http.get(url, config)
    .then( res => {
      $log.log('fetched page articles', res.data);
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to fetch page articles',err);
      return $q.reject(err);
    });
  };

  service.fetchArticleAns= function(articleID){
    $log.debug('service.fetchArticleAns');

    let url = `${__API_URL__}/api/articleans/${articleID}`;
    let config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'aplication/json'
      }
    };

    return $http.get(url, config)
    .then( res => {
      $log.log('fetched article and answers', res.data);
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to fetch form and answers',err);
      return $q.reject(err);
    });
  };

  service.deleteArticle = function(articleID){
    $log.debug('service.deleteArticle');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/article/deletearticle/${articleID}`;
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
      $log.log('deleted a article');
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to delete a article',err);
      return $q.reject(err);
    });
  };

  service.deleteArticleFeed = function(articleID){
    $log.debug('service.deleteArticle');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/article/deletearticlefeed/${articleID}`;
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
      $log.log('deleted a article feed');
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to delete a article feed',err);
      return $q.reject(err);
    });
  };


  return service;
}