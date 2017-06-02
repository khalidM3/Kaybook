'use strict';

require('./_post-tile.scss');

module.exports = {
  template: require('./post-tile.html'),
  controller: ['$log', '$uibModal', '$window', 'postService' , 'picService','profileService', PostTileController],
  controllerAs: 'postTileCtrl',
  bindings: {
    post: '<'
  }
};


function PostTileController($log, $uibModal, $window, postService, picService, profileService){
  $log.debug('PostTileController');

  let profileID = $window.localStorage.getItem('profileID');

  this.$onInit = function(){
    $log.debug('postTileCtrl.$onInit()');

    this.isVid = (/\.mp4$/).test(this.post.postPicURI);
    this.isMyPost = this.post.posterPID.toString() === profileID.toString();

    profileService.fetchProfile2(this.post.posterPID)
    .then(profile => {
      console.log('PPPPPPPPP', profile);
      this.poster = profile;
    });
  };


  this.animationsEnabled = true;

  // this.open = function (size, parentSelector) {
  //   // var parentElem = parentSelector ? 
  //   //   angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
  //   var modalInstance = $uibModal.open({
  //     animation: this.animationsEnabled,
  //     // ariaLabelledBy: 'modal-title',
  //     // ariaDescribedBy: 'modal-body',
  //     // templateUrl: 'myModalContent.html',
  //     // controller: 'ModalInstanceCtrl',
  //     // controllerAs: 'this',
  //     size: size,
  //     // appendTo: parentElem,
  //     // resolve: {
  //     //   items: function () {
  //     //     return this.items;
  //     //   }
  //     // }
  //   });

  //   // modalInstance.result.then(function (selectedItem) {
  //   //   this.selected = selectedItem;
  //   // }, function () {
  //   //   $log.info('Modal dismissed at: ' + new Date());
  //   // });
  // };



  this.openComponentModal = function () {
    let post = this.post;
    var modalInstance = $uibModal.open({
      animation: this.animationsEnabled,
      component: 'postItem',
      resolve: {
        post: function () {
          console.log('<><><><><><><><><><><><><>', post);
          return post; 
        }
      }
    });

  };

  this.openEditPostModal = function () {
    let post = this.post;
    var modalInstance = $uibModal.open({
      animation: this.animationsEnabled,
      component: 'editPost',
      resolve: {
        post: function () {
          console.log('<><><><><><><><><><><><><>', post);
          return post; 
        }
      }
    });
  };

  this.deletePost = function(){
    $log.debug('postTileController.deletePost()');
    //TODO => fix the delete pic route
    let post = this.post;
    postService.deletePost(post._id)
    .then( () => {
      picService.deletePostPic(post._id);
    })
    .catch( (err) => $log.error('Did not delete the post', err));
  };

  this.deletePost = function(){
    $log.debug('postTileController.deletePost()');

    let post = this.post;
    picService.deletePostPic(post._id)
    .then( () => {
      return postService.deletePost(post._id);
    })
    .catch( () => {
      return postService.deletePost(post._id);
    });
  };


}