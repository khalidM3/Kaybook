'use strict';

require('./_post-tile.scss');

module.exports = {
  template: require('./post-tile.html'),
  controller: ['$log', '$uibModal', '$window', '$location', 'postService' , 'picService','profileService', PostTileController],
  controllerAs: 'postTileCtrl',
  bindings: {
    post: '<'
  }
};


function PostTileController($log, $uibModal, $window, $location, postService, picService, profileService){
  $log.debug('PostTileController');

  let profileID = $window.localStorage.getItem('profileID');

  this.$onInit = function(){
    $log.debug('postTileCtrl.$onInit()');

    this.isVid = (/\.mp4$/).test(this.post.postPicURI);
    this.isMyPost = this.post.posterID._id === profileID;
    this.poster = this.post.posterID;
    this.showRepost = this.post.repost;
    // if(this.post.repost)  {
    //   this.post = this.post.repost;
    //   console.log('poster ', this.post.posterID);
    //   this.isRePost = true;
    // }

    // profileService.fetchProfile2(this.post.posterID)
    // .then(profile => {
    //   console.log('PPPPPPPPP', profile);
    //   this.poster = profile;
    //   return profile;
    // })
    // .then( profile => {
    //   if(profile) return profile;
    //   profileService.fetchProfile2(this.post.postedID)
    //   .then(profile => {
    //     console.log('PPPPPPPPP', profile);
    //     this.poster = profile;
    //   });
    // });
  };


  this.animationsEnabled = true;


  this.openEditPostModal = function () {
    let post = this.post;
    $uibModal.open({
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
    $log.debug('postTileCtrl.deletePost()');

    postService.deletePost(this.post._id)
    .then( res => console.log('Successfully deleted question', res))
    .catch( err => console.log('Failed to delete question', err));
    
  };

  this.rePost = () => {

    profileService.fetchMyProfile()
    .then( profile => {
      console.log('profile', profile);
      this.repost = {};
      this.repost.friends = profile.friends;
      console.log('repost', this.repost);
      return postService.rePost(this.post._id, this.repost)
            .then( post => console.log(post));
    });
  };

  // this.deletePost = function(){
  //   $log.debug('postTileController.deletePost()');
  //   //TODO => fix the delete pic route
  //   let post = this.post;
  //   postService.deletePost(post._id)
  //   .then( () => {
  //     picService.deletePostPic(post._id);
  //   })
  //   .catch( (err) => $log.error('Did not delete the post', err));
  // };
  
  this.goTo = () => {
    // console.log('the tyoe is =====|>', this.post.type);
    // if(this.post.type !== 'pic' && this.post.type !== 'question' ) return $location.url(`/${this.post.type}/${this.post._id}`);
    
    let post = this.post;
    return $uibModal.open({
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

  this.goToRepost = () => {
    let post = this.post.repost;
    return $uibModal.open({
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



}