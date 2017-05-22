'use strict';

require('./_profile-view.scss');

module.exports = {
  template: require('./profile-view.html'),
  controller: ['$log', '$rootScope', '$stateParams', '$window', '$uibModal', 'profileService', 'postService', ProfileViewController],
  controllerAs: 'profileViewCtrl',
  bindings: {
    profile: '<',
  }
};

function ProfileViewController($log, $rootScope, $stateParams, $window, $uibModal, profileService, postService) {
  $log.debug('ProfileViewController');

  this.userID = $stateParams.userID;
  this.showEditView = false;

  let userID = $window.localStorage.getItem('userID');
  
  this.showEditOption = userID === this.userID;

  this.check = function(){
    $log.debug('profileViewController.check()');

    // let userID = $window.localStorage.getItem('userID');
    // profileService.fetchProfile(userID)
    // .then( profile => {
    //   let arr = profile.friends;
    //   this.showLeaveBtn = arr.some( PID => PID.toString() === this.profile._id.toString());
    //   // console.log('profile.memberOf  }-------->',arr);
    //   // console.log('}------->', this.userID);
    // });

    console.log('PROFILE ::::::::', this.profile);
  };
  this.check();


  this.deleteProfile = function(profile) {  
    if (this.profile._id === profile._id) {
      this.profile = null;
    }
  };

  this.updateProfileView = function() {
    $log.debug('ProfileViewController.updateProfileView()');
    console.log('this.postArray:::',this.postsArray);

    this.postsArray = [];
    
    profileService.fetchProfile(this.userID)
    .then(profile => {
      this.profile = profile;
      this.showEditView = false;
      if(profile.posts.length !== 0){
        profile.posts.forEach( profileID => {
          postService.fetchPost(profileID)
          .then( postObj => this.postsArray.push(postObj));
        });
      }
    })
    .catch( err => $log.error(err.message));
  };

  this.sendReq = function(){
    $log.debug('ProfileViewController.sendReq()');
    console.log('This.profile ::::', this.profile);
    profileService.sendReq(this.profile._id)
    .then( res => console.log('SUCCESS sent friend req()', res))
    .catch( err => console.error('FAILED to send friend req()', err));
    return this.updateProfileView();
  };


  // this.open = function (size, selectedPost) {
  //   // var parentElem = parentSelector ? 
  //   //   angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
  //   var modalInstance = $uibModal.open({
  //     animation: this.animationsEnabled,
  //     // ariaLabelledBy: 'modal-title',
  //     // ariaDescribedBy: 'modal-body',
  //     templateUrl: 'create-post.html',
  //     // controller: 'CreatePostController',
  //     // controllerAs: 'this',
  //     size: size,
  //     // appendTo: parentElem,
  //     resolve: {
  //       items: function () {
  //         return selectedPost;
  //       }
  //     }
  //   });

  //   // modalInstance.result.then(function (selectedItem) {
  //   //   this.selected = selectedItem;
  //   // }, function () {
  //   //   $log.info('Modal dismissed at: ' + new Date());
  //   // });
  // };

  this.openComponentModal = function ( profile) {

    var modalInstance = $uibModal.open({
      animation: this.animationsEnabled,
      component: 'createPost',
      resolve: {
        profile: function () {
          return profile;
        }
      }
    });
  };


}
