'use strict';

require('./_home.scss');

module.exports = ['$log', '$rootScope', '$stateParams', 'profileService', HomeController];

function HomeController($log, $rootScope, $stateParams, profileService) {
  $log.debug('HomeController');

  this.myUserID = $stateParams.userID;
  this.loggedIn = true;

  this.fetchProfile = function() {
    $log.debug('HomeController.fetchProfile()');

    profileService.fetchProfile(this.myUserID)
    .then(profile => this.myProfile = profile)
    // .then( () => recipeService.fetchMyRecipes(this.myProfile._id))
    // .then(recipes => this.myRecipes = recipes);
  };

  this.fetchAllProfiles = function(){
    $log.debug('HomeController.fetchAllProfiles()');

    profileService.fetchProfiles()
    .then( profiles => this.allProfiles = profiles);
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
