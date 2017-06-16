'use strict';

require('./_create-merch.scss');

module.exports = {
  template: require('./create-merch.html'),
  controller: ['$log', '$window', 'merchService', CreateMerchController],
  controllerAs: 'createMerchCtrl',
  bindings: {
    page: '<',
    onPostCreated: '&',
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
};

function CreateMerchController($log, $window, merchService) {
  $log.debug('CreateMerchController');

  this.merch = {};
  
  this.createMerch = function(){
    $log.debug('createMerchCtrl.createMerch()');

    let profileID = $window.localStorage.getItem('profileID');
    let admin = this.resolve.page.admins.some( PID => PID.toString() === profileID.toString());

    if( admin ) {
      merchService.createMerch(this.resolve.page._id, this.merch)
      .then( merch => console.log('Success createMerch()', merch))
      .catch(err => console.log('Failed createMerch()', err));
    }
  };

  this.cancel = function () {
    this.dismiss({$value: 'cancel'});
  };



}