'use strict';

require('./_home.scss');

module.exports = ['$log', '$rootScope', '$stateParams', 'profileService', 'postService', HomeController];

function HomeController($log, $rootScope, $stateParams, profileService, postService) {
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

  this.fetchAllProfiles = function(){
    $log.debug('HomeController.fetchAllProfiles()');

    this.joinedPosts = [];
    profileService.fetchProfiles()
    .then( profiles => this.allProfiles = profiles);
  };

  this.fetchJoinedProfiles = function(){
    $log.debug('HomeController.fetchJoinedProfiles()');

    this.allProfiles = [];
    this.joinedPosts = [];

    profileService.fetchProfile(this.myUserID)
    .then(profile => {
      let arr = profile.memberOf;
  
      arr.forEach( profileUID => {
        profileService.fetchProfile(profileUID)
        .then( profile => this.allProfiles.push(profile));
      });
    })
    .catch( err => $log.error('couldnt fetch joinded Profiles', err));
  };

  this.fetchJoinedPosts = function(){
    $log.debug('HomeController.fetchJoinedPosts()');

    this.joinedPosts = [];
    // console.log('JOINED ++++++', this.joinedPosts);
    this.allProfiles = [];

    profileService.fetchProfile(this.myUserID)
    .then(profile => {
      let arr = profile.memberOf;
  
      arr.forEach( profileUID => {
        profileService.fetchProfile(profileUID)
      .then( profile => {
        postService.fetchMyPosts(profile._id)
        .then( profile => {
          // console.log('fetch joined posts [][][]:', profile.posts);
          for( var prop in profile.posts){
            console.log(profile.posts[prop].description);
            let prof = {};
            prof.data = profile.posts[prop];
            this.joinedPosts.push(prof);
          }
        });
      });
      });
    })
    .catch( err => $log.error('couldnt fetch joined posts', err));
    
    this.allProfiles = [];
  };

  // this.fetchAllRecipes = function() {
  //   $log.debug('HomeController.fetchAllRecipes()');

  //   recipeService.fetchRecipes()
  //   .then(recipes => this.allRecipes = recipes);
  // };

  // this.updateAllRecipesView = function() {
  //   $log.debug('HomeController.updateAllRecipesView()');

  //   this.fetchAllRecipes();
  // };

  this.fetchProfile();
  // this.fetchAllProfiles();
  // this.fetchAllRecipes();

  // this.recipes = [];

  // this.fetchRecipes = function() {
  //   recipeService.fetchRecipes()
  //   .then( recipes => {
  //     this.recipes = recipes;
  //     this.currentRecipe = recipes[0];
  //   });
  // };

  // this.fetchRecipes();

  // $rootScope.$on('$locationChangeSuccess', () => {
  //   this.fetchRecipes();
  // });
}
