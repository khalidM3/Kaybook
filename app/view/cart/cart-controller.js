'use strict';

require('./_cart.scss');

module.exports = ['$log', '$rootScope', '$stateParams', '$window', 'profileService', CartController];

function CartController($log, $rootScope, $stateParams, $window, profileService) {
  $log.debug('CartController');

  this.$onInit = function(){
    $log.debug('cartCtrl.$oninit()');

    // profileService.fetchMyCart()
    // .then( profile => {
    //   this.profile =  profile;
    //   this.merchesArr = profile.Mcart;
    //   console.log(this.merchesArr);
    // });

    this.merches = JSON.parse($window.localStorage.merch);
    this.merchesArr = [];
    console.log('ma merch', this.merches);
    // for(let prop in this.merches) this.merchesArr.push(this.merches[prop]);
  };

  this.removeItem = (merch) => {
    console.log('merch taken out', merch._id);
    delete this.merches[merch._id];
    $window.localStorage.merch = JSON.stringify(this.merches);
  };

  



}