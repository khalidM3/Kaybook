'use strict';

require('./_member.scss');

module.exports = {
  template: require('./member.html'),
  controller: ['$log', '$location', '$stateParams', '$window','$uibModal', 'profileService', 'roomService', MemberController],
  controllerAs: 'memberCtrl',
  bindings: {
    room: '<',
    resolve: '<'
  }
};


function MemberController($log, $location, $stateParams, $window, $uibModal,  profileService, roomService){
  $log.debug('MemberController');

  // if(this.resolve) {
  //   this.fetchFriends();
  // }
  this.fetchFriends = function(){
    profileService.fetchFriends(this.resolve.profile._id)
    .then( profile => {
      this.profile = profile;
      console.log('profiles', profile);
      return;
    })
    .catch( err => console.log('Failed fetchMyFriends ', err));
  };

  this.addArr = [];

  this.pushToAdd = function(friend){

    let added = this.addArr.indexOf(friend._id);
    console.log(added);
    if(added > -1) return true;
    this.addArr.push(friend._id);
    console.log(this.addArr);
    return;
  };

  this.addMembers = function(){
    $log.debug('memberCtrl.addMembers()');

    let roomID = $stateParams.roomID;
    let memberData = {
      members: this.addArr
    };

    console.log(roomID);
    console.log(memberData);
    roomService.addMembers(roomID, memberData)
    .then( room => console.log('Success added member', room));
  };

  this.removeMembers = function(){
    $log.debug('memberCtrl.addMembers()');

    let roomID = $stateParams.roomID;
    let memberData = {
      members: this.addArr
    };

    console.log(roomID);
    console.log(memberData);
    roomService.removeMembers(roomID, memberData)
    .then( room => console.log('Success removed member', room));
  };

  // this.fetchFriends();
  this.bark = function(){
    console.log('BARK BARK BARK');
    console.log('resolve', this.resolve);
  };

  

}