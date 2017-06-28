'use strict';

module.exports = ['$q', '$log', '$window', '$http', 'authService', optionService];

function optionService($q, $log, $window, $http, authService){
  $log.debug('optionService');

  let service = {};

  service.createOption = function(merchID, optionData){
    $log.debug('service.createOption');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/option/newoption/${merchID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.post(url, optionData, config);
    })
    .then( res => {
      $log.log('created a option');
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to create a option',err);
      return $q.reject(err);
    });
  };

  

  service.fetchPageMerch = function(pageID){
    $log.debug('service.fetchPageMerch');

    let url = `${__API_URL__}/api/merch/pagemerch/${pageID}`;
    let config = {
      headers: {
        'Content-Option': 'application/json',
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

  service.addCart = function(merchID){
    $log.debug('service.addCart()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/merch/addcart/${merchID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Option': 'application/json',
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

  return service;
}