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
        console.log('Success createMerch()', merch);
        // this.createdMerch = merch;

        return optionService.createOption(merch._id, { options: this.optionsArr});
      })
      .then( merch => console.log('success', merch))
      .catch(err => console.log('Failed createMerch()', err));
    }
  };

  this.addToOptions = function(){
    console.log('inside baby');
    this.showTable = true;
    let result = JSON.parse(JSON.stringify(this.option));
    this.optionsArr.push(result);
    this.option.val1 = '';
    this.option.val2 = '';
    this.option.val3 = '';
    this.option.val1 = '';
    console.log(this.optionsArr);
    return;
  };

  this.removeOption = (option) => {
    console.log('options 1', this.optionsArr);
    console.log('show table =====>', this.showTable, this.optionsArr.length);
    this.optionsArr.forEach( (op, index) => {
      // op = JSON.stringify(op);
      // option = JSON.stringify(option);
      let isMatch =  option === op;
      console.log('isMatch', option.val1 === op.val1);
      console.log('should true',JSON.stringify(op) === JSON.stringify(option));
      if( isMatch) this.optionsArr.splice(index, 1);
      this.showTable = this.optionsArr.length > 0;
    });

    console.log('options 1]2', this.optionsArr); 
  };




  // this.cancel = function () {
  //   this.dismiss({$value: 'cancel'});
  // };



}