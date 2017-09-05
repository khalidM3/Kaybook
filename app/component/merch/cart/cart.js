'use strict';

require('./_cart.scss');

// module.exports = ['$log', '$rootScope', '$stateParams', '$window', 'profileService', CartController];

module.exports = {
  template: require('./cart.html'),
  controller: ['$log', '$rootScope', '$stateParams', '$window', 'profileService', CartController],
  controllerAs: 'cartCtrl',
  bindings: {
    page: '<',
  }
};

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
    console.log('ma merch', this.merches);
    this.total = 0;
    for(var prop in this.merches) {
      console.log('merch is \n', this.merches[prop]);
      let ptotal = this.merches[prop].price * this.merches[prop].count;
      console.log('ptotal is \n', ptotal);
      this.total = this.total + ptotal;
      console.log('what ? \n',this.total);
    }
    // for(let prop in this.merches) this.merchesArr.push(this.merches[prop]);
  };

  this.removeItem = (merch) => {
    console.log('merch taken out', merch._id);
    delete this.merches[merch._id];
    $window.localStorage.merch = JSON.stringify(this.merches);
  };

  



}