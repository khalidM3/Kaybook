'use strict';

require('./_post-item.scss');

module.exports = {
  template: require('./post-item.html'),
  controller: ['$log', 'postService', 'profileService', PostItemController],
  controllerAs: 'postItemCtrl',
  bindings: {
    post: '<',
    loggedIn: '<',
    profile: '<',
    onpostChange: '&',
  }
};

function PostItemController($log, postService, profileService){
  $log.debug('postItemController');


  this.showEditpost = false;

  this.deletepost = function(post){
    $log.debug('postItemController.deletepost');

    postService.deletepost(post)
    .then(this.onpostChange());
  };

  this.poster = function() {
    $log.debug('postItemController.poster', this.post.posterPID);

    for( var prop in this.post.data){
      console.log(prop);
    }

    profileService.fetchProfile2(this.post.data.posterPID)
    .then(profile => this.poster = profile);
  };

  // this.poster();

  this.$onInit = function() {
    $log.debug('postItemController.$onInit()');
    
    if (this.post) return this.poster();
    return this.onpostChange();
  };

  this.updatepostItemView = function() {
    $log.debug('postItemController.updatepostItemView', this.post);

    this.onpostChange();
  };
}
