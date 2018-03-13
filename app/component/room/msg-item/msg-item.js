'use strict';

import './_msg-item.scss';

class MsgItemController {
  constructor($log, $location, $stateParams, $window, socket) {
    this.$log = $log;
    this.$location = $location;
    this.$stateParams = $stateParams;
    this.$window = $window;
    this.socket = socket;
  }

  $onInit() {
    this.profile =  JSON.parse(this.$window.localStorage.profile);
    this.showEdit = false;
    this.isOwner = this.profile._id == this.msg.owner;

    console.log('__MSG__}', );
  }

  update() {
    delete this.msg.$$hashKey;
    this.socket.emit('UPDATE', this.msg);
    this.showEdit = false;
  }

  delete () {
    this.socket.emit('DELETE', this.msg);
    this.msg = null;
  }

  adjust (e) {
    let element = typeof e === 'object' ? e.target : this.$window.document.getElementById(e);
    let scrollHeight = element.scrollHeight;
    console.log(scrollHeight)
    // let minheight = this.post.type === 'article' ? 400 : 100;
    // console.log('minheight', minheight);
    element.style.height = scrollHeight +"px";
  };

  

}

module.exports = {
  template: require('./msg-item.html'),
  controller: MsgItemController,
  controllerAs: 'msgItemCtrl',
  bindings: {
    msg: '<',
    profile: '<',
  }
};