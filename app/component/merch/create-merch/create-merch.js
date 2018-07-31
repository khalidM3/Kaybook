'use strict';

require('./_create-merch.scss');

module.exports = {
  template: require('./create-merch.html'),
  controller: ['$log', '$window', 'merchService', 'optionService', CreateMerchController],
  controllerAs: 'createMerchCtrl',
  bindings: {
    page: '<',
    onPostCreated: '&',
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
};

function CreateMerchController($log, $window, merchService, optionService) {
  $log.debug('CreateMerchController');

  this.merch = {};
  this.option = {};
  this.optionsArr = [];
  this.showTable = false;

  this.createMerch = function(){
    $log.debug('createMerchCtrl.createMerch()');

    let profileID = $window.localStorage.getItem('profileID');
    let admin = this.resolve.page.admins.some( PID => PID.toString() === profileID.toString());

    if( admin ) {
      merchService.createMerch(this.resolve.page._id, this.merch)
      .then( merch =>  {
        return optionService.createOption(merch._id, { options: this.optionsArr});
      })
      .then( merch => console.log('success', merch))
      .catch(err => console.log('Failed createMerch()', err));
    }
  };

  this.addToOptions = function(){
    this.showTable = true;
    let result = JSON.parse(JSON.stringify(this.option));
    this.optionsArr.push(result);
    this.option.val1 = null;
    this.option.val2 = null;
    this.option.val3 = null;
    this.option.val1 = null;
    return;
  };

  this.removeOption = (option) => {
    this.optionsArr.forEach( (op, index) => {
      let isMatch =  option === op;
      if( isMatch) this.optionsArr.splice(index, 1);
      this.showTable = this.optionsArr.length > 0;
    });
  };


}