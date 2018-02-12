'use strict';

import './_create-merch.scss';
import template from './create-merch.html';


class CreateMerchController {
  constructor($log, $window, merchService, optionService) {
    this.$log = $log;
    this.$window = $window;
    this.merchService = merchService;
    this.optionService = optionService;
  }

  

  $onInit() {
    this.merch = {};
    this.option = {};
    this.optionsArr = [];
    this.showTable = false;
    this.profile = JSON.parse(this.$window.localStorage.profile);
  }

  createMerch() {
    console.log('create merch', this.merch)
    // let profileID = this.$window.localStorage.getItem('profileID');
    let admin = this.resolve.page.admins.some( PID => PID.toString() === this.profile._id);
    if( admin ) {
      this.merch.options = this.optionsArr;
      return this.merchService.createMerch(this.resolve.page._id, this.merch)
      .then( merch =>  this.close({$value: merch}))
      .catch(err => console.log('Failed createMerch()', err));
    }
  }

  addToOptions() {
    console.log('inside baby');
    this.showTable = true;
    let result = JSON.parse(JSON.stringify(this.option));
    this.optionsArr.push(result);
    this.option.val1 = null;
    this.option.val2 = null;
    this.option.val3 = null;
    this.option.val1 = null;
    console.log(this.optionsArr);
    return;
  }

  removeOption(option) {
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
  }

  cancel () {
    this.dismiss({$value: 'cancel'});
  }

}

module.exports = {
  template: template,
  controller: CreateMerchController,
  controllerAs: 'createMerchCtrl',
  bindings: {
    page: '<',
    onPostCreated: '&',
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
};