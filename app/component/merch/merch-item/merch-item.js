'use strict';

require('./_merch-item.scss');

module.exports = {
  template: require('./merch-item.html'),
  controller: ['$log', 'merchService', 'profileService', MerchItemController],
  controllerAs: 'merchItemCtrl',
  bindings: {
    loggedIn: '<',
    profile: '<',
    onmerchChange: '&',
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
};

function MerchItemController($log, merchService, profileService){
  $log.debug('merchItemController');

  
// merchs.data are resolve.merch

  this.showEditmerch = false;
  this.showCreateComment = false;

  this.$onInit = function() {
    $log.debug('merchItemController.$onInit()');
    
    
  };

  this.addToCart = function(){
    $log.debug('merchItemCtrl.addToMerch()');

    merchService.addCart(this.resolve.merch._id)
    .then( profile => console.log('Success addToCart', profile));
  };
  

  this.cancel = function () {
    this.dismiss({$value: 'cancel'});
  };
}
