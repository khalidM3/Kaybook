'use strict';

module.exports = ['$q', '$log', '$http', '$window', 'authService', profileService];

function profileService($q, $log, $http, $window, authService) {
  $log.debug('profileService');

  let service = {};
  service.profiles = [];
  service.profile = 'yahyah';

  service.createProfile = function(profile) {
    $log.debug('profileService.createProfile');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/profile`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.post(url, profile, config);
    })
    .then( res => {
      $log.log('profile created');
      service.setProfile(res.data);
      return res.data;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.setProfile = function(profile) {
    $log.debug('profileService.saveProfile');
    
    $window.localStorage.profile = JSON.stringify({
      _id: profile._id,
      name: profile.name,
      bio: profile.bio,
      profilePicURI: profile.profilePicURI,
      profileBannerURI: profile.profileBannerURI,
      links: profile.links,
    });

  };
//change to get profile
  service.fetchProfile = function() {
    $log.debug('profileService.fetchProfile');

    return authService.getToken()
    .then( token => {
      if ($window.localStorage.profile) {
        return JSON.parse($window.localStorage.profile);
      } else {
        let url = `${__API_URL__}/profiles/me`;
        let config = {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        };
        return $http.get(url, config);
      }
    })
    .then( res => {
      $log.log('Profile Retrieved', res);
      service.setProfile(res.data);
      return res.data;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });

  };

  service.searchProfile = function(name) {
    $log.debug('profileService.searchProfile');

    let url = `${__API_URL__}/api/profile/search/${name}`;
    let config = {
      headers: {
        Accept: 'application/json'
      }
    };

    return $http.get(url, config)
    .then( res => {
      $log.log('Profile Retrieved', res);
      return res.data;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.fetchMyProfile = function() {
    $log.debug('profileService.fetchProfile');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/profiles/me`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      return $http.get(url, config);
    })
    .then( res => {
      $log.log('Profile Retrieved', res);
      service.setProfile(res.data);
      return res.data;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.fetchProfile2 = function(profileID) {
    $log.debug('profileService.fetchProfile2');

    let url = `${__API_URL__}/api/profile2/${profileID}`;
    let config = {
      headers: {
        Accept: 'application/json'
      }
    };

    return $http.get(url, config)
    .then( res => {
      $log.log('Profile Retrieved', res);
      service.profile = res.data;
      return service.profile;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };


  service.fetchProfiles = function() {
    $log.debug('profileService.fetchProfiles');

    let url = `${__API_URL__}/api/allprofiles`;
    let config = {
      headers: {
        Accept: 'application/json'
      }
    };

    return $http.get(url, config)
    .then( res => {
      $log.log('All profiles retrieved.');
      service.profiles = res.data;
      return service.profiles;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.updateProfile = function(profileData) {
    $log.debug('profileService.updateProfile');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/profile`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      return $http.put(url, profileData, config);
    })
    .then( res => {
      $log.log('successfuly updated profile');
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to update profile ',err.message);
      return $q.reject(err);
    });
  };

  service.deleteProfile = function() {
    $log.debug('profileService.deleteProfile');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/profile/${userID}`;
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      };

      return $http.delete(url, config);
    })
    .then( res => {
      $log.log('Profile deleted.');
      service.profile = res.data;
      return service.profile;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.sendReq = function(profileID){
    $log.debug('profileService.sendReq');

    return authService.getToken()
    .then( token => {
      console.log(token);
      let url = `${__API_URL__}/api/sendreq/${profileID}`;
      let config = {
        headers: {
          authorization: `Bearer ${token}`
        }
      };

      return $http.get(url, config);
    })
    .then( res => {
      $log.log('sent a friend request');
      service.profile = res.data;
      return service.profile;
    })
    .catch( err => {
      $log.error('Didnt send a friend request',err);
      return $q.reject(err);
    });
  };

  service.unSendReq = function(profileID){
    $log.debug('profileService.unSendReq');

    return authService.getToken()
    .then( token => {
      console.log(token);
      let url = `${__API_URL__}/api/unsendreq/${profileID}`;
      let config = {
        headers: {
          authorization: `Bearer ${token}`
        }
      };

      return $http.get(url, config);
    })
    .then( res => {
      $log.log('unsent a friend request');
      service.profile = res.data;
      return service.profile;
    })
    .catch( err => {
      $log.error('Didnt unsend a friend request',err);
      return $q.reject(err);
    });
  };

  service.acceptReq = function(profileID){
    $log.debug('profileService.acceptReq');

    return authService.getToken()
    .then( token => {
      console.log(token);
      let url = `${__API_URL__}/api/acceptreq/${profileID}`;
      let config = {
        headers: {
          authorization: `Bearer ${token}`
        }
      };

      return $http.get(url, config);
    })
    .then( res => {
      $log.log('accepted friend request');
      service.profile = res.data;
      return service.profile;
    })
    .catch( err => {
      $log.error('Didnt accept friend request',err);
      return $q.reject(err);
    });
  };

  service.unFriend = function(profileID){
    $log.debug('profileService.unFriend');

    return authService.getToken()
    .then( token => {
      console.log(token);
      let url = `${__API_URL__}/api/unfriend/${profileID}`;
      let config = {
        headers: {
          authorization: `Bearer ${token}`
        }
      };

      return $http.get(url, config);
    })
    .then( res => {
      $log.log('unfriended the person');
      service.profile = res.data;
      return service.profile;
    })
    .catch( err => {
      $log.error('Didnt unfriend person',err);
      return $q.reject(err);
    });
  };

  service.fetchJoinedPages = function(profileID){
    $log.debug('profileService.joinProfile');

    return authService.getToken()
    .then( token => {
      console.log(token);
      let url = `${__API_URL__}/api/joinedpages/${profileID}`;
      let config = {
        headers: {
          authorization: `Bearer ${token}`
        }
      };

      return $http.get(url, config);
    })
    .then( res => {
      $log.log('fetched joined pages', res);
      return res.data;
    })
    .catch( err => {
      $log.error('failed to fetch joined pages',err);
      return $q.reject(err);
    });
  };

  service.fetchFriends = function(profileID) {
    $log.debug('profileService.fetchFriends');

    let url = `${__API_URL__}/api/getfriends/${profileID}`;
    let config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    };

    return $http.get(url, config)
    .then( res => {
      $log.log('friends Retrieved', res);
      service.profile = res.data;
      return service.profile;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.fetchFriendReq= function(profileID) {
    $log.debug('profileService.fetchfriendReq');

    let url = `${__API_URL__}/api/getfriendreq/${profileID}`;
    let config = {
      headers: {
        Accept: 'application/json'
      }
    };

    return $http.get(url, config)
    .then( res => {
      $log.log('friends req Retrieved', res);
      service.profile = res.data;
      return service.profile;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  // service.leaveProfile = function(joinedUID){
  //   $log.debug('profileService.joinProfile');

  //   return authService.getToken()
  //   .then( token => {
  //     console.log(token);
  //     let url = `${__API_URL__}/api/leave/${joinedUID}`;
  //     let config = {
  //       headers: {
  //         authorization: `Bearer ${token}`
  //       }
  //     };

  //     return $http.get(url, config);
  //   })
  //   .then( res => {
  //     $log.log('left the page');
  //     service.profile = res.data;
  //     return service.profile;
  //   })
  //   .catch( err => {
  //     $log.error('Didnt leave the page',err);
  //     return $q.reject(err);
  //   });
  // };

  service.fetchMyCart = function() {
    $log.debug('profileService.fetchCart');

    return authService.getToken()
    .then( token => {
      let profileID = $window.localStorage.getItem('profileID');
      let ftoken = 'dummy token';
      let url = `${__API_URL__}/api/mycart/${profileID}`;
      let config = {
        headers: {
          authorization: `Bearer ${token}`
        }
      };
      console.log('url ++++++++++',url);
      console.log(token);
      return $http.get(url, config);
    })
     .then( res => {
       $log.log('Profile Retrieved', res.data);
       service.profile = res.data;
       return service.profile;
    
     })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  // service.fetchMyCart = function() {
  //   $log.debug('profileService.fetchCart');

  //   let profileID = $window.localStorage.getItem('profileID');

  //   let url = `${__API_URL__}/api/mycart/${profileID}`;
  //   let config = {
  //     headers: {
  //       Accept: 'application/json'
  //     }
  //   };
  //   console.log('url ++++++++++',url);
  //   return $http.get(url, config)
  //    .then( res => {
  //      $log.log('Profile Retrieved', res.data);
  //      service.profile = res.data;
  //      return service.profile;
  //    })
  //   .catch( err => {
  //     $log.error(err.message);
  //     return $q.reject(err);
  //   });
  // };


  // service.joinProfile2 = function(joinedID){
  //   $log.debug('profileService.joinProfile');

  //   return authService.getToken()
  //   .then( token => {
  //     let url = `${__API_URL__}/api/join2/${joinedID}`;
  //     let config = {
  //       headers: {
  //         Accept: 'application/json',
  //         Authorization: `Bearer ${token}`,
  //         'Content-Type': 'application/json'
  //       }
  //     };

  //     return $http.put(url, config);
  //   })
  //   .then( res => {
  //     $log.log('joined the page');
  //     service.profile = res.data;
  //     return service.profile;
  //   })
  //   .catch( err => {
  //     $log.error('Didnt join the page',err.message);
  //     return $q.reject(err);
  //   });
  // };


  return service;
}
