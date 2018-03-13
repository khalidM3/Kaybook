'use strict';

class roomService {
  constructor($q, $log, $window, $http, authService) {
    this.$q = $q;
    this.$log = $log;
    this.$window = $window;
    this.$http = $http;
    this.authService = authService;
  }

  createRoom(room) {
    return this.authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/room`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      return this.$http.post(url, room, config);
    })
    .then( res => {
      this.$log.log('created a room', res.data);
      return res.data;
    })
    .catch( err => {
      this.$log.error('Failed to create a room',err);
      return this.$q.reject(err);
    });
  }

  fetchMyRooms() {
    return this.authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/room/myrooms`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return this.$http.get(url, config);
    })
    .then( res => {
      this.$log.log('fetched a room');
      return res.data;
    })
    .catch( err => {
      this.$log.error('Failed to fetch a room',err);
      return this.$q.reject(err);
    });
  }

  fetchRoom(roomID) {
    return this.authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/room/getroom/${roomID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      return this.$http.get(url, config);
    })
    .then( res => {
      this.$log.log('fetched a room', res);
      return res.data;
    })
    .catch( err => {
      this.$log.error('Failed to fetch a room',err);
      return this.$q.reject(err);
    });
  }

  update(room) {
    this.$log.debug('service.update');

    return this.authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/room/update`;
      let config = {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return this.$http.put(url, room , config);
    })
    .then( res => {
      this.$log.log('updated room');
      return res.data;
    })
    .catch( err => {
      this.$log.error('Failed to update room',err);
      return this.$q.reject(err);
    });
  }

}


module.exports = roomService;


// function roomService($q, $log, $window, $http, authService){
//   $log.debug('roomService');

//   let service = {};

//   service.createRoom = function(room){
//     $log.debug('service.createPoll');

//     return authService.getToken()
//     .then( token => {
//       let url = `${__API_URL__}/api/room`;
//       let config = {
//         headers: {
//           Accept: 'application/json',
//           Authorization: `Bearer ${token}`
//         }
//       };
//       return $http.post(url, room, config);
//     })
//     .then( res => {
//       $log.log('created a room', res.data);
//       return res.data;
//     })
//     .catch( err => {
//       $log.error('Failed to create a room',err);
//       return $q.reject(err);
//     });
//   };

//   service.fetchMyRooms = function(){
//     $log.debug('service.fetchMyRooms');


//     return authService.getToken()
//     .then( token => {
//       let url = `${__API_URL__}/api/room/myrooms`;
//       let config = {
//         headers: {
//           Accept: 'application/json',
//           Authorization: `Bearer ${token}`
//         }
//       };

//       return $http.get(url, config);
//     })
//     .then( res => {
//       $log.log('fetched a room');
//       return res.data;
//     })
//     .catch( err => {
//       $log.error('Failed to fetch a room',err);
//       return $q.reject(err);
//     });
//   };

//   service.fetchRoom = function(roomID){
//     $log.debug('service.fetchMyRooms');

//     return authService.getToken()
//     .then( token => {
//       let url = `${__API_URL__}/api/room/getroom/${roomID}`;
//       let config = {
//         headers: {
//           Accept: 'application/json',
//           Authorization: `Bearer ${token}`
//         }
//       };

//       return $http.get(url, config);
//     })
//     .then( res => {
//       $log.log('fetched a room', res);
//       return res.data;
//     })
//     .catch( err => {
//       $log.error('Failed to fetch a room',err);
//       return $q.reject(err);
//     });
//   };


//   service.addMembers = function(roomID, memberData){
//     $log.debug('service.addMembers');

//     return authService.getToken()
//     .then( token => {
//       let url = `${__API_URL__}/api/room/addmembers/${roomID}`;
//       let config = {
//         headers: {
//           'Content-Type': 'application/json',
//           Accept: 'application/json',
//           Authorization: `Bearer ${token}`
//         }
//       };

//       return $http.put(url, memberData , config);
//     })
//     .then( res => {
//       $log.log('added members');
//       return res.data;
//     })
//     .catch( err => {
//       $log.error('Failed to add members',err);
//       return $q.reject(err);
//     });
//   };

//   service.removeMembers = function(roomID, memberData){
//     $log.debug('service.removeMembers');

//     return authService.getToken()
//     .then( token => {
//       let url = `${__API_URL__}/api/room/removemembers/${roomID}`;
//       let config = {
//         headers: {
//           'Content-Type': 'application/json',
//           Accept: 'application/json',
//           Authorization: `Bearer ${token}`
//         }
//       };

//       return $http.put(url, memberData , config);
//     })
//     .then( res => {
//       $log.log('removed members');
//       return res.data;
//     })
//     .catch( err => {
//       $log.error('Failed to remove members',err);
//       return $q.reject(err);
//     });
//   };

//   service.update = function(room){
//     $log.debug('service.update');

//     return authService.getToken()
//     .then( token => {
//       let url = `${__API_URL__}/api/room/update`;
//       let config = {
//         headers: {
//           'Content-Type': 'application/json',
//           Accept: 'application/json',
//           Authorization: `Bearer ${token}`
//         }
//       };

//       return $http.put(url, room , config);
//     })
//     .then( res => {
//       $log.log('updated room');
//       return res.data;
//     })
//     .catch( err => {
//       $log.error('Failed to update room',err);
//       return $q.reject(err);
//     });
//   };

//   return service;
// }