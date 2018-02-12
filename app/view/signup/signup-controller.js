'use strict';

require('./_signup.scss');

module.exports = ['$log', '$window', '$location', 'authService', 'profileService', SignupController];

function SignupController($log, $window, $location, authService, profileService) {
  $log.debug('SignupController');

  this.validate = (e) => {
    console.log('validating',e);
    // let {name, value} = e.target;
    // let short = value.split('').length > 5;
    // switch(name) {
    // case 'username':
    //   if(!short) return;
    //   this.usernameError = {message: 'username is too short'};
    //   return;
    // case 'email':
    //   if(short) return this.usernameError = true;
    //   return;
    // default:
    //   return;
    // }
  };

  this.barking = (arg) => console.log(arg);

  this.signup = function(user) {
    $log.debug('signupCtrl.signup');

    authService.signup(user)
    .then(res => {
      let profile = {};
      profile.name = res.config.data.username;
      console.log('PROFILE', profile);
      profileService.createProfile(profile)
      .then(profile => {
        // $window.localStorage.setItem('profile', profile);
        $location.url('/home/' );
      });
    });
  };
}
