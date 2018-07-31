'use strict';

require('./_profile-tile.scss');

module.exports = {
  template: require('./profile-tile.html'),
  controller: ['$log', '$location', '$stateParams', '$window', 'profileService', ProfileTileController],
  controllerAs: 'profileTileCtrl',
  bindings: {
    profile: '<'
  }
};


function ProfileTileController($log, $location, $stateParams, $window, profileService){
  $log.debug('ProfileTileController');

  this.$onInit = function(){

    this.showAcceptBtn = this.showUnFriendBtn = this.showSendReqBtn = this.showUnSendReqBtn = true;
  };

  this.goToProfile = function(){
    $log.debug('ProfileTileController.goToProfile');

    $location.url(`/profile/${this.profile._id}`);
  };

  this.sendReq = function(){
    $log.debug('ProfileTileController.sendReq()');

    this.showAcceptBtn = false;
    this.showUnFriendBtn = false;
    this.showSendReqBtn = false;
    this.showUnSendReqBtn = true;

    profileService.sendReq(this.profile._id)
    .then( res => console.log('SUCCESS sent friend req()', res))
    .catch( err => console.error('FAILED to send friend req()', err));
  };

  this.unSendReq = function(){
    $log.debug('ProfileTileController.unSendReq()');

    this.showAcceptBtn = false;
    this.showUnFriendBtn = false;
    this.showSendReqBtn = true;
    this.showUnSendReqBtn = false;

    profileService.unSendReq(this.profile._id)
    .then( res => console.log('Success unSendReq() ', res))
    .catch( err => console.log('Failed unSendReq()', err));
  };



  this.acceptReq = function(){
    $log.debug('ProfileTileController.acceptReq()');

    this.showAcceptBtn = false;
    this.showUnFriendBtn = true;
    this.showSendReqBtn = false;
    this.showUnSendReqBtn = false;

    profileService.acceptReq(this.profile._id)
    .then( res => console.log('SUCCESS accepted friend req()', res))
    .catch( err => console.error('FAILED accepted friend req()', err));
  };

  this.unFriend = function(){
    $log.debug('ProfileTileCtrl.unFriend()');

    this.showAcceptBtn = false;
    this.showUnFriendBtn = false;
    this.showSendReqBtn = true;
    this.showUnSendReqBtn = false;

    profileService.unFriend(this.profile._id)
    .then( res => console.log('Success unFriend() ', res))
    .catch( err => console.log('Failed unFriend()', err));
  };

}