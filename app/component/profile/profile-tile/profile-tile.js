'use strict';

require('./_profile-tile.scss');

module.exports = {
  template: require('./profile-tile.html'),
  controller: ['$log', '$location', '$stateParams', 'profileService', ProfileTileController],
  controllerAs: 'profileTileCtrl',
  bindings: {
    profile: '<'
  }
};


function ProfileTileController($log, $location, $stateParams, profileService){
  $log.debug('ProfileTileController');

  this.$onInit = function(){
    let profileID = $stateParams.profileID;
    let isFriend = this.profile.friends.some(pID => pID.toString() === profileID);
    let sentThemReq = this.profile.friendReq.some(pID => pID.toString() === profileID);
    let sentMeReq = this.profile.sentReq.some(pID => pID.toString() === profileID);
    this.showAcceptBtn = sentMeReq;
    this.showUnFriendBtn = isFriend;
    this.showSendReqBtn = !isFriend && !sentMeReq;
    this.showUnSendReqBtn = sentThemReq;
    console.log(this.profile.name);
    console.log('is my friend', isFriend);
    console.log('sent them a request', sentThemReq);
    console.log('sent me a request', sentMeReq);
    console.log('+++++++++++++++++++++++++++++++++');
  };

  this.goToProfile = function(){
    $log.debug('ProfileTileController.goToProfile');

    $location.url(`/profile/${this.profile.userID}/${this.profile._id}`);
  };

  this.sendReq = function(){
    $log.debug('ProfileTileController.sendReq()');

    profileService.sendReq(this.profile._id)
    .then( res => console.log('SUCCESS sent friend req()', res))
    .catch( err => console.error('FAILED to send friend req()', err));
    // return this.updateProfileView();
  };

  this.unSendReq = function(){
    $log.debug('ProfileTileController.unSendReq()');

    profileService.unSendReq(this.profile._id)
    .then( res => console.log('Success unSendReq() ', res))
    .catch( err => console.log('Failed unSendReq()', err));
  };



  this.acceptReq = function(){
    $log.debug('ProfileTileController.acceptReq()');

    profileService.acceptReq(this.profile._id)
    .then( res => console.log('SUCCESS accepted friend req()', res))
    .catch( err => console.error('FAILED accepted friend req()', err));
    // return this.updateProfileView();
  };

  this.unFriend = function(){
    $log.debug('ProfileTileCtrl.unFriend()');

    profileService.unFriend(this.profile._id)
    .then( res => console.log('Success unFriend() ', res))
    .catch( err => console.log('Failed unFriend()', err));
  };

}