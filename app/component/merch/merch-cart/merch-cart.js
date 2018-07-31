'use strict';

require('./_merch-cart.scss');

module.exports = {
  template: require('./merch-cart.html'),
  controller: ['$log', '$uibModal', '$window','profileService', MerchCartController],
  controllerAs: 'merchCartCtrl',
  bindings: {
    merch: '<'
  }
};


function MerchCartController($log, $uibModal, $window, profileService){
  $log.debug('MerchCartController');

  let profileID = $window.localStorage.getItem('profileID');

  this.$onInit = function(){
    $log.debug('merchCartCtrl.$onInit()');

    this.isVid = (/\.mp4$/).test(this.merch.merchPicURI);
    this.isMyMerch = this.merch.posterID.toString() === profileID.toString();

    profileService.fetchProfile2(this.merch.posterID)
    .then(profile => {
      this.mercher = profile;
    });
  };

  this.openMerchModal = function () {
    let merch = this.merch;
    var modalInstance = $uibModal.open({
      animation: this.animationsEnabled,
      component: 'merchItem',
      resolve: {
        merch: function () {
          return merch; 
        }
      }
    });

  };
}