'use strict';

require('./_home.scss');


module.exports = ['$log', '$rootScope', '$stateParams', '$location','$uibModal', 'profileService', 'postService', HomeController];

function HomeController($log, $rootScope, $stateParams, $location, $uibModal, profileService, postService) {
  $log.debug('HomeController');

  this.myUserID = $stateParams.userID;
  this.loggedIn = true;


  this.fetchProfile = function() {
    $log.debug('HomeController.fetchProfile()');

    profileService.fetchProfile(this.myUserID)
    .then(profile => this.myProfile = profile);
    // .then( () => recipeService.fetchMyRecipes(this.myProfile._id))
    // .then(recipes => this.myRecipes = recipes);
  };
  this.$onInit = () => {
    new Promise( (resolve, reject) => {
      try {
        return resolve(this.route());
      } catch(err) {
        reject(err);
      }
    })
    .then( () => {
      return this.postParams();
    });
  };

  this.route = function(){
    $log.debug('pageItemCtrl.fetch()');

    this.postsArr = [];
    this.merchesArr = [];
    this.showPostBtn = true;

    switch($stateParams.section) {
    case 'joined':
      return this.fetchJoinedPosts();
    case 'explore':
      return this.explore();
    case 'feed':
      return this.fetchJoinedFeed();
    default: 
      this.fetchPagePosts();
    }
    
    this.postParams();
    
  };

  this.postParams = () => {
    if($stateParams.post) {
      console.log('hapa hapa hapa\n\n\n\n', $stateParams);
      return postService.fetchPost($stateParams.post)
      .then( post => {
        console.log(post);
        this.postsArr = [post, ...this.postsArr];
        this.openPostModal(post);
      });
    }
  };

  this.goToJoined = () => {
    // $location.url('/home/joined');
    console.log($stateParams);
  };

  this.goToExplore = () => {
    $location.url('/home/explore');
  };

  this.goToFeed = () => {
    $location.url('/home/feed');
  };

  this.explore = () => {
    this.fetchAllProfiles();
    this.fetchAllPosts();
  };

  this.fetchAllProfiles = function(){
    $log.debug('HomeController.fetchAllProfiles()');

    this.joinedPosts = [];
    profileService.fetchProfiles()
    .then( profiles => this.allProfiles = profiles);
  };

  this.fetchAllPosts = () => {
    $log.debug('HomeController.fetchAllPosts()');
    postService.fetchAllPosts()
    .then( posts => this.postsArr = posts);
  };

  // this.fetchJoinedProfiles = function(){
  //   $log.debug('HomeController.fetchJoinedProfiles()');

  //   this.allProfiles = [];
  //   this.postsArr = [];

  //   profileService.fetchProfile(this.myUserID)
  //   .then(profile => {
  //     let arr = profile.memberOf;
  
  //     arr.forEach( profileUID => {
  //       profileService.fetchProfile(profileUID)
  //       .then( profile => this.allProfiles.push(profile));
  //     });
  //   })
  //   .catch( err => $log.error('couldnt fetch joinded Profiles', err));
  // };

  this.fetchJoinedPosts = function(){
    $log.debug('HomeController.fetchJoinedPosts()');

    this.allProfiles = [];

    postService.fetchJoinedPosts()
    .then( posts => this.postsArr = posts);
  };

  this.fetchJoinedFeed = function(){
    $log.debug('HomeController.fetchJoinedFeed()');

    this.allProfiles = [];

    postService.fetchJoinedFeed()
    .then( posts => this.postsArr = posts);
  };

  this.goToSocial = function(){
    $log.debug('homectrl.goToSocial()');

    $location.url('/social');
  };



  this.openPostModal = function (post) {
    $uibModal.open({
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
  // $rootScope.$on('$locationChangeSuccess', () => {
  //   this.fetchRecipes();
  // });
}
