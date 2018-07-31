'use strict';

require('./_settings.scss');

module.exports = ['$log', '$rootScope', '$stateParams', '$location', 'profileService', 'postService', 'commentService', SettingsController];


function SettingsController($log, $rootScope, $stateParams, $location, profileService, postService, commentService) {
  $log.debug('SettingsController');



  this.$onInit = () => {
    let section = $stateParams.section;
    this['show'+section] = true;
  };

  this.accountProfile = () => {
    $location.url('settings/profile');
  };

  this.accountContent = () => {
    $location.url('settings/content');
  };

  this.accountPages = () => {
    $location.url('settings/pages');
  };

  this.accountProducts = () => {
    $location.url('settings/products');
  };
  

}