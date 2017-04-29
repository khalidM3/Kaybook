'use strict';

require('./_profile-tile.scss');

module.exports = {
  template: require('./profile-tile.html'),
  controller: ['$log', '$location', ProfileTileController],
  controllerAs: 'profileTileCtrl',
  bindings: {
    profile: '<'
  }
};


function ProfileTileController($log, $location){
  $log.debug('ProfileTileController');

  this.goToProfile = function(){
    $log.debug('ProfileTileController.goToProfile');

    $location.url(`/mypage/${this.profile.userID}`);
  };
}