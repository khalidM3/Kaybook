'use strict';

require('./_login.scss');

module.exports = ['$log', '$location', 'authService', LoginController];

function LoginController($log, $location, authService) {
  $log.debug('LoginController');

  this.myProfile = {};
  this.user = {};

  this.login = function() {
    $log.debug('loginCtrl.login');
    console.log('USER::', this.user);
    authService.login(this.user)
    .then(user => $location.url(`/home/${user._id}`))
    .catch( () => {
      this.showLoginError = true;
      this.user = null;
    });
  };
}