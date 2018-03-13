'use strict';

import './_room-item.scss';
import template from './room-item.html';


class RoomItemController {
  constructor($log, $location, $stateParams, $window, $uibModal, roomService, socket, profileService) {
    this.$log = $log;
    this.$location = $location;
    this.$stateParams = $stateParams;
    this.$window = $window;
    this.$uibModal = $uibModal;
    this.roomService = roomService;
    this.socket = socket;
    this.profileService = profileService;
  }


  $onInit() {
    this.profile =  JSON.parse(this.$window.localStorage.profile);
    this.messages = [];
    // this.showEdit = false;
  }

  $onChanges(changes) {
    this.messages = [];
    let old = changes.room.previousValue;
    this.roomService.fetchRoom(this.room._id)
    .then( room => {
      console.log('__ROOM__', old);
      this.room = room;
      this.messages = room.messages;
      this.socket.emit('ROOM', {
        room: this.room._id,
        old: old ? old._id : undefined,
        id: this.profile._id,
        name: this.profile.name,
        pic: this.profile.profilePicURI,
      });
    });

    this.socket.on('MESSAGE', (data) => {
      this.messages.push(data);
    });

    this.socket.on('UPDATE', (msg) => {
      let updated =  this.messages.map( message => {
        console.log(message);
        if(message._id.toString() == msg._id.toString()) return message = msg;
      })
      this.messages = updated;
    })

    this.socket.on('DELETE', (msg) => {
      let updated = this.messages.filter( message => message._id !== msg._id)
      this.messages = updated;
    })
    
  }

  send() {
    let msg = {
      owner: this.profile._id,
      name: this.profile.name,
      pic: this.profile.profilePicURI,
      room: this.room._id,
      content: this.content,
    }

    this.socket.emit('MESSAGE', msg);
    // this.messages.push(msg);
    this.content = null;
    console.log('CONTenT', this.content);
  }

  
  adjust (e) {
    let element = typeof e === 'object' ? e.target : this.$window.document.getElementById(e);
    let scrollHeight = element.scrollHeight;
    console.log(scrollHeight)
    // let minheight = this.post.type === 'article' ? 400 : 100;
    // console.log('minheight', minheight);
    element.style.height = scrollHeight +"px";
  };

  openSettingsModal () {
    console.log('this rooms', this.rooms);
    let room = this.room;
    this.$uibModal.open({
      animation: this.animationsEnabled,
      component: 'member',
      resolve: {
        room: function () {
          return room;
        }
      },

    })
    .result.then( res => {
      // res.members.push(this.profile._id);
      this.rooms.forEach( (room, i) => {
        let sameMembers1 = room.members.every( member => res.members.some( m => m === member));
        let sameMembers2 = res.members.every( member => room.members.some( m => m === member));
        let sameMembers = sameMembers1 && sameMembers2;
        let sameLength = room.members.length == res.members.length;
        let scanComplete = i == this.rooms.length - 1;
        let sameRoom = res._id == room._id;
        console.log(sameMembers, sameLength, sameRoom);
        if( sameMembers && sameLength) {

          if(!sameRoom) return this.room = res;
          if(sameRoom) {
            return this.roomService.update(res)
            .then( room => {
              // this.rooms.push(room);
              this.rooms[i] = room;
              return this.room = room;
            });
          }
          throw true;
        }

        if(scanComplete && !sameMembers) {
          return this.roomService.update(res)
          .then( room => {
            // this.rooms.push(room);
            // this.rooms[i] = room;
            this.room = room;
          });

        }

      });

      // if(this.rooms.length < 1) {
      //   console.log('when no rooms', res);
      //   return roomService.createRoom(res)
      //   .then( room => console.log('Successfully createRoom ', room));
      // }
    });
  }

}

module.exports = {
  template: template,
  controller: RoomItemController,
  controllerAs: 'roomItemCtrl',
  bindings: {
    room: '<',
    rooms: '<',
    showmenu: '=',
    profile: '<',
  }
};

// export default { templae: template, controller: controller, controllerAs: controllerAs, bindings: bindings }
