'use strict';

import './_member.scss';
import template from './member.html';


class MemberController {
  constructor($log, $location, $stateParams, $window, $uibModal,  profileService, roomService) {
    this.$log = $log;
    this.$location = $location;
    this.$stateParams = $stateParams;
    this.$window = $window;
    this.$uibModal = $uibModal;
    this.profileService = profileService;
    this.roomService = roomService;
  }


  $onInit () {
    this.profile = JSON.parse(this.$window.localStorage.profile);
    console.log('this is the init', this.profile);
    // this.room = this.resolve.room;
    this.room = JSON.parse(JSON.stringify(this.resolve.room));
    this.fetchFriends();
    this.addArr = [];
  }


  fetchFriends() {
    console.log('FETCHING FRIENDS')
    this.members = [];
    this.friends = [];
    return this.profileService.fetchFriends(this.profile._id)
    .then( profile => {
      this.profile = profile;
      let members = this.room.members;
      this.profile.friends.forEach( friend => {
        let isMember = members.some( m => m == friend._id);
        if(isMember) return this.members.push(friend);
        return this.friends.push(friend);
      });

      this.friendsArr = profile.friends;
      console.log('members are', this.members);
      console.log('friends are', this.friends);
      return;
    })
    .catch( err => console.log('Failed fetchMyFriends ', err));
  }


  add (profile) {
    let isMember = this.room.members.some(mid => mid == profile._id);
    if(isMember) return;
    this.room.members.push(profile._id);
    this.members.push(profile);
    this.friends = this.friends.filter( friend => friend._id !== profile._id);
    return;
  }

  remove (profile) {
    let isMember = this.room.members.some(mid => mid == profile._id);
    console.log('__ISMEMBER__', isMember)
    if(!isMember) return;
    this.room.members = this.room.members.filter( mid => mid !== profile._id);
    this.members = this.members.filter( member => member._id !== profile._id);
    this.friends.push(profile);
    return;
  }

  leave () {
    alert('Are You sure');
    this.remove(this.profile)
  }

  save () {
    return this.close({$value: this.room});
  }

  cancel () {
    this.dismiss({$value: 'cancel'});
  }

}


module.exports = {
  template: template,
  controller:  MemberController,
  controllerAs: 'memberCtrl',
  bindings: {
    room: '<',
    resolve: '<',
    close: '&',
    dismiss: '&',
  }
};