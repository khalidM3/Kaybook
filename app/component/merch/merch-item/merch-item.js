'use strict';

require('./_merch-item.scss');

module.exports = {
  template: require('./merch-item.html'),
  controller: ['$log', 'merchService', 'profileService', MerchItemController],
  controllerAs: 'merchItemCtrl',
  bindings: {
    loggedIn: '<',
    profile: '<',
    onmerchChange: '&',
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
};

function MerchItemController($log, merchService, profileService){
  $log.debug('merchItemController');

  
// merchs.data are resolve.merch

  this.showEditmerch = false;
  this.showCreateComment = false;

  this.$onChanges = (changes) => {
    console.log('changes in the onChanges function');
    this.order =  JSON.parse(JSON.stringify(this.resolve.merch.options[0]));
    console.log('order ===>', this.order);
    this.val1Arr = [];
    this.val2Arr = [];
    console.log(this.order);

    this.resolve.merch.options.forEach( option => {
      let present1 = this.val1Arr.some( val => val === option.val1);
      let present2 = this.val2Arr.some( val => val === option.val2);
      console.log('p1        ', present1);
      console.log('p2        ', present2);
      if(!present1) this.val1Arr.push(option.val1);
      if(!present2) this.val2Arr.push(option.val2);
    });

    

    console.log('val1 array ',this.val1Arr);
    console.log('val2 array ',this.val2Arr);
  };

  this.filterOptions = (name, value) => {
    console.log('name', name);
    console.log('value', value);
    this.order[name] = value;
    this.resolve.merch.options.forEach( option => {
      if(option.val1 === this.order.val1 && option.val2 === this.order.val2 && option.val3 === this.order.val3) {
        console.log('passed',option.val1, this.order.val1);
        console.log('passed2',option.val2, this.order.val2);
        // this.order = option;
        console.log('new order', option.val1, option.val2);
        this.order = JSON.parse(JSON.stringify(option));
        console.log(this.order._id);
        return this.order;
      } 
      // console.log('not it', this.order.val1, this.order.val2);
    });
  };


  this.addToCart = function(){
    $log.debug('merchItemCtrl.addToMerch()');

    merchService.addCart(this.order._id)
    .then( profile => console.log('Success addToCart', profile));
  };

  this.bark = () => {
    console.log('merch', this.resolve.merch);
    console.log('order', this.order);
  };
  

  this.cancel = function () {
    this.dismiss({$value: 'cancel'});
  };
}
