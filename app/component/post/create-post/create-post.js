'use strict';

require('./_create-post.scss');

module.exports = {
  template: require('./create-post.html'),
  controller: ['$log', '$location', '$rootScope', '$window', 'postService', 'picService', '$http','$q', '$document',  CreatePostController],
  controllerAs: 'createPostCtrl',
  bindings: {
    onPostCreated: '&',
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
};

function CreatePostController($log, $location, $rootScope, $window, postService, picService, $http, $q, $document) {
  $log.debug('CreatePostController');

  $log.debug('HERE !!!',this.profile);

  this.$onInit = () => {
    this.profile = $window.localStorage.getItem('profile');
    this.chosePost();
  };
  
  this.post = {};
  this.post.type = 'pic';
  this.uploadedPost = {};

  this.chosePost = () => {
    console.log('chose post');
    this.post = {};
    this.post.type = 'pic';
    this.showPic = true;
    this.showArticle = this.showPoll = false;
  };

  this.choseQuest = () => {
    console.log('chose question');
    this.post = {};
    this.post.type = 'question';
    this.showPic = this.showArticle = this.showPoll = false;
  };

  this.choseArticle = () => {
    console.log('chose article');
    this.post = {};
    this.post.type = 'article';
    this.showArticle = true;
    this.showPic = this.showPoll = false;
  };

  this.chosePoll = () => {
    console.log('chose poll');
    this.post = {};
    this.post.choices = [];
    this.post.type = 'poll';
    this.showPoll = true;
    this.showArticle = this.showPic = false;
  };

  this.addChoice = () => {
    console.log({name: this.choice1});
    this.post.choices.push({name: this.choice, picURI: this.picURI});
    this.choice = null;
    this.picURI = null;
    console.log('post\n', this.post);
  };

  this.removeChoice = (choice) => {
    this.post.choices.forEach( ( ch, ind )  => {
      if(choice.name === ch.name && choice.picURI === ch.picURI) {
        this.post.choices.splice(ind, 1);
      }
    });
  };

  this.parseStr = (str) => {
    let urlReg = /(\b(?:https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    let imgReg = /\.(?:jpe?g|gif|png)$/i;
    let hash = /#(?:\w)\w*/g;
    let embed = /((https| http):\/\/(www\.youtu|www\.vimeo|imgur|))/;
    
    return str.split(urlReg).map( ( word, i ) => ({
      type: word.match(urlReg) || word.match(hash)
              ? word.match(imgReg)
              ? 'img' : word.match(embed)
                        ? 'embed' : 'link'
              : 'string',
      payload: word,
      index: i,
      link: word.match(hash) ? `http://localhost:8080/#!/hash/${word.split('#')[1]}`: word,
      size: {}
    }));
  };

  this.parse = () => {
    // console.log('changing', this.parsedArr? this.parsedArr : null);
    // this.parsedArr = this.parseStr(this.post.desc);
    let urlReg = /(\s(?:https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])\s/ig;
    if(this.x.match(urlReg)) {
      // console.log('x ===>\n',this.x);
      !this.post.desc ? this.post.desc = '' : false;
      // console.log('desc ===> \n', this.post.desc);
      this.post.desc = this.post.desc + this.x;
      // console.log('total desc ===> \n', this.post.desc);
      this.x = '';
      this.parsedArr = this.parseStr(this.post.desc);
    }
  };
  
  this.update = (word) => {
    let urlReg1 = /(\b(?:https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    let urlReg2 = /(\s(?:https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])\s/ig;
    console.log('WORD :: ', word);

    // this.parsedArr[word.index].payload = word.payload;
    let arr = this.post.desc.split(urlReg1);
    console.log('ARR :: ', arr);
    // console.log('post deska ??????', this.post.desc.split(urlReg))
    // console.log('arr1', arr);
    // word.payload.trim();
    arr[word.index] = word.payload;
    // console.log('arr2', arr);
    // console.log('arr3', arr[word.index]);
    // console.log('post desc {}{}{}{}{}{}{', this.post.desc);
    this.post.desc = arr.join(' ');
    //// if(word.payload.match(urlReg)) 
    // console.log('this is the post desc =>>>',this.post.desc);
    this.showUpdate = false;
    if(word.payload.match(urlReg1)){
      return this.parsedArr = this.parseStr(this.post.desc);
    } 

    // console.log('post desc', this.post.desc); 
    // console.log('parsed arr', this.parsedArr);
  };


  this.removeLink = (word) => {
    let urlReg = /(\s(?:https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])\s/ig;
    // this.parsedArr[word.index] = null;
    let arr = this.post.desc.split(urlReg);
    arr[word.index] = null;
    this.post.desc = arr.join(' ');
    this.index = null;
    this.parsedArr = this.parseStr(this.post.desc);
  };

  this.updateWord = (word) => {
    this.index = word.index;
    console.log('index', this.index);
    this.showUpdate = true;
  };


  this.createPost = function(){
    $log.debug('createPostCtrl.createPost()');
    // console.log('creating post on ',this.resolve.page ? this.resolve.page : this.resolve.profile)
    // this.post.desc = this.post.desc + this.x;
    // this.post.searchTerms = this.post.desc.match(/#(?:\w)\w*/g);

    if(this.resolve.profile) {
      return postService.createProfilePost(this.post)
      .then( post => console.log('Success createPost()', post))
      .catch(err => console.log('Failed createPost()', err));
    }

    if( this.resolve.page) {
      let admin = this.profile._id === this.resolve.page.profileID;
      if( !admin ) {
        console.log('inside page !admin');
        postService.createPost(this.resolve.page._id, this.post)
        .then( post => console.log('Success createPost()', post))
        .catch(err => console.log('Failed createPost()', err));
      }

      if( admin ) {
        console.log('inside page admin');
        postService.createFeed(this.resolve.page._id, this.post)
        .then( post => console.log('Success createForumFeed()', post))
        .catch(err => console.log('Failed createForumFeed()', err));
      }
    }

  };

  // this.show = () => {
  //   this.pic = this.post.picURI;
  // };

  this.cancel = function () {
    this.dismiss({$value: 'cancel'});
  };

  this.adjust = (e) => {
    // console.log('adjusting adjusting adjusting');
    let element = typeof e === 'object' ? e.target : $window.document.getElementById(e);
    let scrollHeight = element.scrollHeight;
    // let minheight = this.post.type === 'article' ? 400 : 100;
    // console.log('minheight', minheight);
    element.style.height = scrollHeight > 100 ? scrollHeight+'px' : 100 +'px';
  };

  this.choseText = () => {
    this.showLinkInput = false;
    this.showTextInput = true;
    this.showChoiceInputs = true;
  };

  this.choseLink = () => {
    this.showTextInput = false;
    this.showLinkInput = true;
    this.showChoiceInputs = true ;
  };

  this.validatePic = (src) => {
    var deferred = $q.defer();
    var image = new Image();
    image.onerror = () =>  {
      deferred.resolve(false);
    };
    image.onload = () =>  {
      deferred.resolve(true);
    };
    image.src = src;
    return deferred.promise;
  };



  // this.bark = () => {
  //   console.log('barking barking\n', typeof this.post.content, this.post.content);
  // };

  



}
  




// let profileID = $window.localStorage.getItem('profileID');
//     // todo - change to array of admin profile ID's
//     // let admin = this.resolve.page.admins.some(PID => PID.toString() === profileID);
//     if(profileID === this.resolve.page.profileID ) {
//       postService.createFeed(this.resolve.page._id, this.post)
//       .then( post => {
//         console.log('res.post  CAPITAL', post._id);
//         console.log('uploadedPost', this.uploadedPost);
//         if( this.uploadedPost.name) picService.uploadPostPic(post._id, this.uploadedPost);
//         return;
//       })
//       .then( () => {
//         this.post = null;
//         this.uploadPost = null;
//         this.onPostCreated();
//       })
//       .then( () => this.cancel())
//       .catch( err => {
//         this.post = null;
//         this.uploadPost = null;
//         console.log('the error', err);
      // });
