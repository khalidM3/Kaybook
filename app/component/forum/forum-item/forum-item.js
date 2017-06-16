'use strict';

require('./_forum-item.scss');

module.exports = {
  template: require('./forum-item.html'),
  controller: ['$log', '$window', '$stateParams', 'profileService', 'forumService', ForumItemController],
  controllerAs: 'forumItemCtrl',
  bindings: {
    page: '<'
  }
};


function ForumItemController($log, $window, $stateParams, profileService, forumService){
  $log.debug('ForumItemController');

  this.forumID = $stateParams.forumID;
  

  this.$onInit = function(){
    $log.debug('forumItemCtrl.onInit()');

    
    forumService.fetchForumAns(this.forumID)
    .then( forum =>  {
      this.forum =  forum;
      this.answersArr = forum.forumAns;
      console.log('ARR',this.answersArr);
      return;
    })
    .then( () => {
      profileService.fetchProfile2(this.forum.posterPID)
      .then( profile =>  {
        this.poster = profile;
        let profileID = $window.localStorage.getItem('profileID');
        return this.showDeleteBtn = profileID === this.poster._id;
      });
    })
    .catch(err => console.log('failed fetchForum()', err));
  };

  this.deleteForum = function(){
    $log.debug('forumItemCtrl.deleteForum()');

    forumService.deleteForum(this.forum._id)
    .then( res => console.log('Successfully deleted forum', res))
    .catch( err => console.log('Failed to delete forum', err));
    
  };

}