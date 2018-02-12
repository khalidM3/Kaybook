'use strict';

import './_merch-tile.scss';

class MerchTileController {
  constructor($log, $location, $uibModal, $window, merchService, picService, profileService) {
    this.$log = $log;
    this.$location = $location;
    this.$uibModal = $uibModal;
    this.$window = $window;
    this.merchService = merchService;
    this.picService = picService;
    this.profileService = profileService;
  }

  $onInit() {
    this.profile = JSON.parse(this.$window.localStorage.profile);
  }


  goToMerch () {
    let merch = this.merch;
    this.$location.search('mid', merch._id);
    this.$uibModal.open({
      animation: this.animationsEnabled,
      component: 'merchItem',
      resolve: {
        merch: function () {
          return merch; 
        }
      }
    })
    .closed.then( () => {
      this.$location.search('mid', null);
    })
  }

}


module.exports = {
  template: require('./merch-tile.html'),
  controller: ['$log', '$location' ,'$uibModal', '$window', 'merchService' , 'picService','profileService', MerchTileController],
  controllerAs: 'merchTileCtrl',
  bindings: {
    merch: '<'
  }
}

// function MerchTileController($log, $location, $uibModal, $window, merchService, picService, profileService){
//   $log.debug('MerchTileController');


//   this.$onInit = function(){
//     $log.debug('merchTileCtrl.$onInit()');

//     this.isVid = (/\.mp4$/).test(this.merch.merchPicURI);
//     this.isMyMerch = this.merch.posterID.toString() === profileID.toString();

//     profileService.fetchProfile2(this.merch.posterID)
//     .then(profile => {
//       console.log('PPPPPPPPP', this.merch);
//       this.mercher = profile;
//     });
//   };

//   this.openMerchModal = function () {
//     let merch = this.merch;
//     $location.search('mid', merch._id);
//     $uibModal.open({
//       animation: this.animationsEnabled,
//       component: 'merchItem',
//       resolve: {
//         merch: function () {
//           return merch; 
//         }
//       }
//     });
//   };

// }



// this.openMerchModal = function () {
//   merchService.fetchMerchOptions(this.merch._id)
//   .then( merch => {
//     $uibModal.open({
//       animation: this.animationsEnabled,
//       component: 'merchItem',
//       resolve: {
//         merch: function () {
//           return merch; 
//         }
//       }
//     });
//   });
// };