'use strict';

require('./_merch-item.scss');

module.exports = {
  template: require('./merch-item.html'),
  controller: ['$log', '$window', 'merchService', MerchItemController],
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

function MerchItemController($log, $window, merchService){
  $log.debug('merchItemController');

  this.showEditmerch = false;
  this.showCreateComment = false;

  this.$onChanges = (changes) => {
    this.order =  JSON.parse(JSON.stringify(this.resolve.merch.options[0]));
    this.order.count = 1;
    this.val1Arr = [];
    this.val2Arr = [];

    this.resolve.merch.options.forEach( option => {
      let present1 = this.val1Arr.some( val => val === option.val1);
      let present2 = this.val2Arr.some( val => val === option.val2);
      if(!present1) this.val1Arr.push(option.val1);
      if(!present2) this.val2Arr.push(option.val2);
    });
  };

  this.filterOptions = (name, value) => {
    this.order[name] = value;
    this.disableBtns = true;
    this.resolve.merch.options.forEach( option => {

      if(option.val1 === this.order.val1 && option.val2 === this.order.val2) {
        this.disableBtns = false;
        this.order = JSON.parse(JSON.stringify(option));
        this.order.count = 1;
        return this.order;
      } 
    });
  };

  this.addToCart = () => {
    $log.debug('merchItemCtrl.addToMerch()');

    
    if(!$window.localStorage.merch) $window.localStorage.merch = JSON.stringify({});
    let merch = JSON.parse($window.localStorage.merch);
    if(! merch[this.order._id]) merch[this.order._id] = this.order;
    let enough = this.order.qtty - (merch[this.order._id].count + this.order.count) > -1;
    enough ? merch[this.order._id].count += this.order.count: merch[this.order._id].count = this.order.qtty;
    $window.localStorage.merch = JSON.stringify(merch);
  };

  this.add = () => {
    this.order.qtty - this.order.count > 0 ?  ++this.order.count: false;
  };

  this.subtract = () => {
    this.order.count - 1 > 0 ?  --this.order.count: false;
  };

  this.deleteMerch = () => {
    merchService.deleteMerch(this.resolve.merch._id)
  };


  this.bark = () => {
  };
  

  this.cancel = ()  => {
    this.dismiss({$value: 'cancel'});
  };
}
