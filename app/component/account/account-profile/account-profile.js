'use strict';

require('./_account-profile.scss');


module.exports = {
  template: require('./account-profile.html'),
  controller: ['$log', '$window',  AccountProfileController],
  controllerAs: 'accountProfileCtrl',
  bindings: {
    profile: '<'
  }
};

function AccountProfileController($log, $window) {
  $log.debug('AccountContentController');

  this.$onInit = () => {
    this.profile = JSON.parse($window.localStorage.profile);
  };

}