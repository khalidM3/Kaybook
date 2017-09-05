'use strict';

module.exports = ['$q', '$log', '$window', '$http', 'authService', orderService];

function orderService($q, $log, $window, $http, authService){
  $log.debug('orderService');

  let service = {};

  service.createOrder = function(profileID, orderData){
    $log.debug('service.createOrder');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/order/${profileID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.post(url, orderData, config);
    })
    .then( res => {
      $log.log('created an order');
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to create an order',err);
      return $q.reject(err);
    });
  };



  return service;
}