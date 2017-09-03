'use strict';

module.exports = ['$q', '$log', '$window', '$http', 'authService', merchService];

function merchService($q, $log, $window, $http, authService){
  $log.debug('merchService');

  let service = {};

  service.createMerch = function(pageID, merchData){
    $log.debug('service.createMerch');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/merch/merch/${pageID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.post(url, merchData, config);
    })
    .then( res => {
      $log.log('created a merch');
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to create a merch',err);
      return $q.reject(err);
    });
  };

  

  service.fetchPageMerch = function(pageID){
    $log.debug('service.fetchPageMerch');

    let url = `${__API_URL__}/api/merch/pagemerch/${pageID}`;
    let config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'aplication/json'
      }
    };

    return $http.get(url, config)
    .then( res => {
      $log.log('fetched page merch', res.data);
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to fetch page merch',err);
      return $q.reject(err);
    });
  };

  service.fetchMerchOptions = function(merchID){
    $log.debug('service.fetchMerchOptions');

    let url = `${__API_URL__}/api/merch/merchoptions/${merchID}`;
    let config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'aplication/json'
      }
    };

    return $http.get(url, config)
    .then( res => {
      $log.log('fetched merch and options', res.data);
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to fetch merch and options',err);
      return $q.reject(err);
    });
  };


  service.fetchMerch = function(){
    $log.debug('service.fetchMerch');

    let url = `${__API_URL__}/api/merch/all`;
    let config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'aplication/json'
      }
    };

    return $http.get(url, config)
    .then( res => {
      $log.log('fetched all merch', res.data);
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to fetch all merch',err);
      return $q.reject(err);
    });
  };

  service.addCart = function(merchID){
    $log.debug('service.addCart()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/merch/addcart/${merchID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.get(url,config);
    })
    .then( res => {
      $log.log('added to cart');
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to cart',err);
      return $q.reject(err);
    });
  };

  service.deleteMerch = function(merchID){
    $log.debug('service.deleteMerch()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/merch/deletemerch/${merchID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.delete(url,config);
    })
    .then( res => {
      $log.log('Successfuly deleted merch');
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to delete merch',err);
      return $q.reject(err);
    });
  };

  return service;
}