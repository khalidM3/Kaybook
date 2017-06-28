'use strict';

require('./_create-option.scss');

module.exports = {
  template: require('./create-option.html'),
  controller: ['$log', '$window', 'optionService', CreateOptionController],
  controllerAs: 'createOptionCtrl',
  bindings: {
    page: '<',
    merch: '=',
    onPostCreated: '&'
  }
};

function CreateOptionController($log, $window, optionService) {
  $log.debug('CreateOptionController');

  this.option = {};
  this.showCreateForm = false;
  
  this.createOption = function(){
    $log.debug('createOptionCtrl.createOption()');

    let profileID = $window.localStorage.getItem('profileID');
    let admin = this.merch.posterID.toString() === profileID;

    if( admin ) {
      optionService.createOption(this.merch._id, this.option)
      .then( merch =>  {
        console.log('Success createOption()', merch);
        this.merch = merch;
        this.merchArr = merch.options;
      })
      .catch(err => console.log('Failed createOption()', err));
    }
  };

  this.bark = () => {
    console.log('this merch', this.merch);
  };

  



}