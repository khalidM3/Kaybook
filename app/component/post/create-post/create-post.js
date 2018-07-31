'use strict';

require('./_create-post.scss');

module.exports = {
  template: require('./create-post.html'),
  controller: ['$log', '$window', 'postService', 'picService', '$http','$q', '$document',  CreatePostController],
  controllerAs: 'createPostCtrl',
  bindings: {
    onPostCreated: '&',
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
};

function CreatePostController($log, $window, postService, picService, $http, $q, $document) {
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
    this.post = {};
    this.post.type = 'pic';
    this.showPic = true;
    this.showArticle = this.showPoll = false;
  };

  this.choseQuest = () => {
    this.post = {};
    this.post.type = 'question';
    this.showPic = this.showArticle = this.showPoll = false;
  };

  this.choseArticle = () => {
    this.post = {};
    this.post.type = 'article';
    this.showArticle = true;
    this.showPic = this.showPoll = false;
  };

  this.chosePoll = () => {
    this.post = {};
    this.post.choices = [];
    this.post.type = 'poll';
    this.showPoll = true;
    this.showArticle = this.showPic = false;
  };

  this.addChoice = () => {
    this.post.choices.push({name: this.choice, picURI: this.picURI});
    this.choice = null;
    this.picURI = null;
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
    let urlReg = /(\s(?:https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])\s/ig;
    if(this.x.match(urlReg)) {
      !this.post.desc ? this.post.desc = '' : false;
      this.post.desc = this.post.desc + this.x;
      this.x = '';
      this.parsedArr = this.parseStr(this.post.desc);
    }
  };
  
  this.update = (word) => {
    let urlReg1 = /(\b(?:https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    let urlReg2 = /(\s(?:https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])\s/ig;
    let arr = this.post.desc.split(urlReg1);
    arr[word.index] = word.payload;
    this.post.desc = arr.join(' ');
    this.showUpdate = false;
    if(word.payload.match(urlReg1)){
      return this.parsedArr = this.parseStr(this.post.desc);
    } 
  };


  this.removeLink = (word) => {
    let urlReg = /(\s(?:https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])\s/ig;
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


    if(this.resolve.profile) {
      return postService.createProfilePost(this.post)
      .then( post => console.log('Success createPost()', post))
      .catch(err => console.log('Failed createPost()', err));
    }

    if( this.resolve.page) {
      let admin = this.profile._id === this.resolve.page.profileID;
      if( !admin ) {
        postService.createPost(this.resolve.page._id, this.post)
        .then( post => console.log('Success createPost()', post))
        .catch(err => console.log('Failed createPost()', err));
      }

      if( admin ) {
        postService.createFeed(this.resolve.page._id, this.post)
        .then( post => console.log('Success createForumFeed()', post))
        .catch(err => console.log('Failed createForumFeed()', err));
      }
    }

  };

  this.cancel = function () {
    this.dismiss({$value: 'cancel'});
  };

  this.adjust = (e) => {
    let element = typeof e === 'object' ? e.target : $window.document.getElementById(e);
    let scrollHeight = element.scrollHeight;
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



  this.bark = () => {
  };
}
  