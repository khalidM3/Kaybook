'use strict';

require('./_mypage.scss');

module.exports = ['$log', '$rootScope', '$stateParams', 'pageService', MypageController];

function MypageController($log, $rootScope, $stateParams, pageService) {
  $log.debug('MypageController');

  this.pageID = $stateParams.pageID;
  // this.loggedIn = true;


  // this.fetchPage = function(){
  //   $log.debug('mypageCtrl.fetchPage()');

  //   pageService.fetchPage(this.pageID)
  //   .then( page =>  {
  //     console.log('+++++++++++++++');
  //     console.log('found it ', page);
  //     return this.page = page;
  //   })
  //   .catch( err => $log.error('Failed to fetchPage()', err));
  // };
  // this.updateRecipeView = function() {
  //   $log.debug('MyrecipesController.updateRecipeView()');

  //   recipeService.fetchMyRecipes(this.myProfile._id)
  //   .then(profile => this.myProfile = profile);
  // };


  // this.fetchPage();
}
