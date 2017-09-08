'use strict';

require('./_home.scss');


module.exports = ['$log', '$rootScope', '$stateParams', '$location', 'profileService', 'postService', HomeController];

function HomeController($log, $rootScope, $stateParams, $location, profileService, postService) {
  $log.debug('HomeController');

  this.myUserID = $stateParams.userID;
  this.loggedIn = true;

  // let socket = io();

  this.fetchProfile = function() {
    $log.debug('HomeController.fetchProfile()');

    profileService.fetchProfile(this.myUserID)
    .then(profile => this.myProfile = profile);
    // .then( () => recipeService.fetchMyRecipes(this.myProfile._id))
    // .then(recipes => this.myRecipes = recipes);
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

  this.fetchProfile();


  // $rootScope.$on('$locationChangeSuccess', () => {
  //   this.fetchRecipes();
  // });
}
