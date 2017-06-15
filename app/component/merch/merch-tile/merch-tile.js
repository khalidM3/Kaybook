'use strict';

require('./_merch-tile.scss');

module.exports = {
  template: require('./merch-tile.html'),
  controller: ['$log', '$uibModal', '$window', 'merchService' , 'picService','profileService', MerchTileController],
  controllerAs: 'merchTileCtrl',
  bindings: {
    merch: '<'
  }
};


function MerchTileController($log, $uibModal, $window, merchService, picService, profileService){
  $log.debug('MerchTileController');

  let profileID = $window.localStorage.getItem('profileID');

  this.$onInit = function(){
    $log.debug('merchTileCtrl.$onInit()');

    this.isVid = (/\.mp4$/).test(this.merch.merchPicURI);
    this.isMyMerch = this.merch.posterID.toString() === profileID.toString();

    profileService.fetchProfile2(this.merch.posterID)
    .then(profile => {
      console.log('PPPPPPPPP', profile);
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