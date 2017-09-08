'use strict';

require('./_hash.scss');


module.exports = ['$log', '$rootScope', '$stateParams', '$location', 'profileService', 'postService', HashController];

function HashController($log, $rootScope, $stateParams, $location, profileService, postService) {
  $log.debug('HashController');

  // this.myUserID = $stateParams.;
  this.loggedIn = true;
  
  this.$onInit = () => {
    this.fetchHashed();
  };

  this.fetchHashed = () => {
    postService.fetchHash($stateParams.term)
    .then( posts => this.postsArr = posts);
  };

}
