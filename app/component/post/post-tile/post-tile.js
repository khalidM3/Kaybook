'use strict';

require('./_post-tile.scss');

module.exports = {
  template: require('./post-tile.html'),
  controller: ['$log', '$uibModal', '$window', '$location', '$stateParams', 'postService' , 'picService','profileService', PostTileController],
  controllerAs: 'postTileCtrl',
  bindings: {
    posts: '<',
  }
};


function PostTileController($log, $uibModal, $window, $location, $stateParams, postService, picService, profileService){
  $log.debug('PostTileController');

  let profileID = $window.localStorage.getItem('profileID');


  this.animationsEnabled = true;

  this.goToPost = (id) => {
    $location.search('id', id);
  };

  this.goToProfile = (id) => {
    $location.url(`/profile/${id}`);
  };

  this.bark = () => {
  };


}