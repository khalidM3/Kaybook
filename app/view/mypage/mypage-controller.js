'use strict';

require('./_mypage.scss');

module.exports = ['$log', '$rootScope', '$stateParams', 'profileService', MypageController];

function MypageController($log, $rootScope, $stateParams, profileService) {
  $log.debug('MypageController');

  this.myUserID = $stateParams.userID;
  this.loggedIn = true;


  this.fetchProfile = function() {
    $log.debug('MypageController.fetchProfile()');

    profileService.fetchProfile(this.myUserID)
    // .then(profile => recipeService.fetchMyRecipes(profile._id))
    .then(prof => {
      console.log('MYPAGE PROFILE :::::',prof);
      this.myProfile = prof;
    });
  };

  // this.updateRecipeView = function() {
  //   $log.debug('MyrecipesController.updateRecipeView()');

  //   recipeService.fetchMyRecipes(this.myProfile._id)
  //   .then(profile => this.myProfile = profile);
  // };


  this.fetchProfile();
}
