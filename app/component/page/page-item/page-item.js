// 'use strict';

// require('./_profile-view.scss');

// module.exports = {
//   template: require('./profile-view.html'),
//   controller: ['$log', '$rootScope', '$stateParams', '$window', '$uibModal', 'profileService', 'postService', ProfileViewController],
//   controllerAs: 'profileViewCtrl',
//   bindings: {
//     profile: '<',
//   }
// };

// function ProfileViewController($log, $rootScope, $stateParams, $window, $uibModal, profileService, postService) {
//   $log.debug('ProfileViewController');

//   this.userID = $stateParams.userID;
//   this.showEditView = false;

//   let userID = $window.localStorage.getItem('userID');
  
//   this.showEditOption = userID === this.userID;

//   this.check = function(){
//     $log.debug('profileViewController.check()');

//     let userID = $window.localStorage.getItem('userID');
//     profileService.fetchProfile(userID)
//     .then( profile => {
//       let arr = profile.memberOf;
//       this.showLeaveBtn = arr.some( PID => PID.toString() === this.userID.toString());
//       // console.log('profile.memberOf  }-------->',arr);
//       // console.log('}------->', this.userID);
//     });
//   };
//   this.check();


//   this.deleteProfile = function(profile) {
//     if (this.profile._id === profile._id) {
//       this.profile = null;
//     }
//   };

//   this.updateProfileView = function() {
//     $log.debug('ProfileViewController.updateProfileView()');
//     console.log('this.postArray:::',this.postsArray);

//     this.postsArray = [];
    
//     profileService.fetchProfile(this.userID)
//     .then(profile => {
//       this.profile = profile;
//       this.showEditView = false;
//       if(profile.posts.length !== 0){
//         profile.posts.forEach( profileID => {
//           postService.fetchPost(profileID)
//           .then( postObj => this.postsArray.push(postObj));
//         });
//       }
//     })
//     .catch( err => $log.error(err.message));
//   };

//   this.join = function(){
//     $log.debug('ProfileViewController.join()');

//     profileService.joinProfile(this.userID)
//     .then( res => console.log('SUCCESS join()', res))
//     .catch( err => console.error('FAILED join()', err));
//     return this.updateProfileView();
//   };

//   this.leave = function(){
//     $log.debug('ProfileViewController.leave()');

//     profileService.leaveProfile(this.userID)
//     .then( profile => console.log(profile))
//     .catch( (err) => console.error('FAILED leave()', err));
//   };

//   // this.open = function (size, selectedPost) {
//   //   // var parentElem = parentSelector ? 
//   //   //   angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
//   //   var modalInstance = $uibModal.open({
//   //     animation: this.animationsEnabled,
//   //     // ariaLabelledBy: 'modal-title',
//   //     // ariaDescribedBy: 'modal-body',
//   //     templateUrl: 'create-post.html',
//   //     // controller: 'CreatePostController',
//   //     // controllerAs: 'this',
//   //     size: size,
//   //     // appendTo: parentElem,
//   //     resolve: {
//   //       items: function () {
//   //         return selectedPost;
//   //       }
//   //     }
//   //   });

//   //   // modalInstance.result.then(function (selectedItem) {
//   //   //   this.selected = selectedItem;
//   //   // }, function () {
//   //   //   $log.info('Modal dismissed at: ' + new Date());
//   //   // });
//   // };

//   this.openComponentModal = function ( profile) {

//     var modalInstance = $uibModal.open({
//       animation: this.animationsEnabled,
//       component: 'createPost',
//       resolve: {
//         profile: function () {
//           return profile;
//         }
//       }
//     });
//   };


// }
