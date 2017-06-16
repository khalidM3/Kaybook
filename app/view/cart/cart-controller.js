'use strict';

require('./_cart.scss');

module.exports = ['$log', '$rootScope', '$stateParams', '$window', 'profileService', CartController];

function CartController($log, $rootScope, $stateParams, $window, profileService) {
  $log.debug('CartController');

  this.$onInit = function(){
    $log.debug('cartCtrl.$oninit()');

    profileService.fetchMyCart()
    .then( profile => {
      this.profile =  profile;
      this.merchesArr = profile.Mcart;
      console.log(this.merchesArr);
    });
  };



}