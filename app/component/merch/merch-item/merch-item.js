'use strict';

import './_merch-item.scss';


function MerchItemController($log, $window, merchService, profileService){
  $log.debug('merchItemController');

  
// merchs.data are resolve.merch

  this.showEditmerch = false;
  this.showCreateComment = false;

  this.$onChanges = (changes) => {
    console.log('changes in the onChanges function');
    this.order =  JSON.parse(JSON.stringify(this.resolve.merch.options[0]));
    this.order.count = 1;
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
    // let order = {};
    // order[name] = value;
    this.disableBtns = true;
    this.resolve.merch.options.forEach( option => {
      // console.log('similarities <>,',
      // 'val1',this.order.val1 === option.val1,
      // 'val2', this.order.val2 === option.val2,
      // 'val3', this.order.val3, option.val3);
      if(option.val1 === this.order.val1 && option.val2 === this.order.val2) {
        // console.log('passed',option.val1, this.order.val1);
        // console.log('passed2',option.val2, this.order.val2);
        // // this.order = option;
        // console.log('new order', option.val1, option.val2);
        this.disableBtns = false;
        this.order = JSON.parse(JSON.stringify(option));
        // console.log(this.order._id);
        this.order.count = 1;
        return this.order;
      } 
      console.log('not it', this.order.val1, this.order.val2, this.order.val3);
    });
  };

  this.addToCart = function(){
    $log.debug('merchItemCtrl.addToMerch()');

    // $window.localStorage.merch ?
    // arr = JSON.parse($window.localStorage.merch)
    // arr.push(this.order)
    // $window.localStorage.merch = JSON.stringify(arr):
    // $window.localStorage.merch = JSON.stringify(this.order);
    
    if(!$window.localStorage.merch) $window.localStorage.merch = JSON.stringify({});
    let merch = JSON.parse($window.localStorage.merch);
    if(! merch[this.order._id]) merch[this.order._id] = this.order;
    let enough = this.order.qtty - (merch[this.order._id].count + this.order.count) > -1;
    enough ? merch[this.order._id].count += this.order.count: merch[this.order._id].count = this.order.qtty;
    $window.localStorage.merch = JSON.stringify(merch);

    // merchService.addCart(this.order._id)
    // .then( profile => console.log('Success addToCart', profile));
    // let option = {
    //   this.order._id
    // }
  };

  this.add = () => {
    this.order.qtty - this.order.count > 0 ?  ++this.order.count: false;
  };

  this.subtract = () => {
    this.order.count - 1 > 0 ?  --this.order.count: false;
  };

  this.deleteMerch = () => {
    merchService.deleteMerch(this.resolve.merch._id)
    .then( res => console.log('Successfuly deleted merch', res));
  };


  this.bark = () => {
    console.log('merch', this.resolve.merch);
    console.log('order', this.order);
  };
  

  this.cancel = function () {
    this.dismiss({$value: 'cancel'});
  };
}

module.exports = {
  template: require('./merch-item.html'),
  controller: ['$log', '$window', 'merchService', 'profileService', MerchItemController],
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

