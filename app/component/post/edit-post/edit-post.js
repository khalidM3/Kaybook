'use strict';

require('./_edit-post.scss');

module.exports = {
  template: require('./edit-post.html'),
  controller: ['$log', '$location', '$rootScope', 'postService', 'picService', EditPostController],
  controllerAs: 'editPostCtrl',
  bindings: {
    profile: '<',
    onPostCreated: '&',
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
};

function EditPostController($log, $location, $rootScope, postService, picService) {
  $log.debug('EditPostController');

  // $log.debug('HERE !!!',this.profile);

  this.post = {};
  this.upload = {};

// "showeditBtn = true"
  this.$onInit = () => {
    this.post = this.resolve.post;
    switch (this.post.type) {
    case 'pic':
      console.log('issa pic');
      this.showPic = true;
      this.showArticle = this.showPoll = false;
      break;
    case 'question':
      this.showPic = this.showArticle = this.showPoll = false;
      // this.parsedArr = this.parseStr(this.post.desc);
      break;
    case 'article':
      this.showArticle = true;
      this.showPic = this.showPoll = false;
      // this.parsedArr = this.parseStr(this.post.desc);
      break;
    case 'poll':
      this.showPoll = true;
      this.showArticle = this.showPic = false;
      // this.parsedArr = this.parseStr(this.post.desc);
      break;
    default:
      console.log('default on me eh ?')
      this.showPic = this.showArticle = this.showPoll = false;
    }
  };
  

  // this.updatePostPic = function(){
  //   picService.uploadPostPic(this.resolve.post._id, this.upload)
  //   .then( () => {
  //     this.upload = null;
  //     this.onPostCreated();
  //   })
  //   .catch( err => {
  //     $log.error('update post pic FAILED', err);
  //   }); 
  // };

  // this.updatePostDesc = function(){
  //   postService.updatePost(this.resolve.post._id, this.post)
  //   .then( () => {
  //     this.post = null;
  //     this.onPostCreated();
  //   })
  //   .catch( err => {
  //     $log.error('update post desc FAILED', err);
  //   });
  // };

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


  // this.parseStr = (str) => {
  //   let urlReg = /(\b(?:https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
  //   let imgReg = /\.(?:jpe?g|gif|png)$/i;
  //   let hash = /#(?:\w)\w*/g;
  //   let embed = /((https| http):\/\/(www\.youtu|www\.vimeo|imgur|))/;
    
  //   return str.split(urlReg).map( ( word, i ) => ({
  //     type: word.match(urlReg) || word.match(hash)
  //             ? word.match(imgReg)
  //             ? 'img' : word.match(embed)
  //                       ? 'embed' : 'link'
  //             : 'string',
  //     payload: word,
  //     index: i,
  //     link: word.match(hash) ? `http://localhost:8080/#!/hash/${word.split('#')[1]}`: word,
  //     size: {}
  //   }));
  // };

  // this.parse = () => {
  //   // console.log('changing', this.parsedArr? this.parsedArr : null);
  //   // this.parsedArr = this.parseStr(this.post.desc);
  //   let urlReg = /(\s(?:https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])\s/ig;
  //   if(this.x.match(urlReg)) {
  //     // console.log('x ===>\n',this.x);
  //     !this.post.desc ? this.post.desc = '' : false;
  //     // console.log('desc ===> \n', this.post.desc);
  //     this.post.desc = this.post.desc + this.x;
  //     // console.log('total desc ===> \n', this.post.desc);
  //     this.x = '';
  //     this.parsedArr = this.parseStr(this.post.desc);
  //   }
  // };
  
  // this.update = (word) => {
  //   let urlReg1 = /(\b(?:https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
  //   let urlReg2 = /(\s(?:https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])\s/ig;
  //   console.log('WORD :: ', word);

  //   // this.parsedArr[word.index].payload = word.payload;
  //   let arr = this.post.desc.split(urlReg1);
  //   console.log('ARR :: ', arr);
  //   // console.log('post deska ??????', this.post.desc.split(urlReg))
  //   // console.log('arr1', arr);
  //   // word.payload.trim();
  //   arr[word.index] = word.payload;
  //   // console.log('arr2', arr);
  //   // console.log('arr3', arr[word.index]);
  //   // console.log('post desc {}{}{}{}{}{}{', this.post.desc);
  //   this.post.desc = arr.join(' ');
  //   //// if(word.payload.match(urlReg)) 
  //   // console.log('this is the post desc =>>>',this.post.desc);
  //   this.showUpdate = false;
  //   if(word.payload.match(urlReg1)){
  //     return this.parsedArr = this.parseStr(this.post.desc);
  //   } 

  //   // console.log('post desc', this.post.desc); 
  //   // console.log('parsed arr', this.parsedArr);
  // };


  // this.removeLink = (word) => {
  //   let urlReg = /(\s(?:https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])\s/ig;
  //   // this.parsedArr[word.index] = null;
  //   let arr = this.post.desc.split(urlReg);
  //   arr[word.index] = null;
  //   this.post.desc = arr.join(' ');
  //   this.index = null;
  //   this.parsedArr = this.parseStr(this.post.desc);
  // };

  // this.updateWord = (word) => {
  //   this.index = word.index;
  //   console.log('index', this.index);
  //   this.showUpdate = true;
  // };



  this.updatePost = function() {
    $log.debug('EditPostController.editPost()');

    // if(this.post.description) this.updatePostDesc();
    // if(this.upload) this.updatePostPic();

    // service.updatePost = function(postID, postData) {};
    console.log('THIS.POST <><><><><><><><><>', this.post);
    this.post.updated = new Date();
    this.post.edited = true;
    // this.post.searchTerms = this.post.desc.match(/#(?:\w)\w*/g);
    postService.updatePost(this.post._id, this.post)
    .then( post => {
      console.log('res.post  CAPITAL', post._id);
      this.post = {};
      // this.cancel();
      this.ok();
      // return picService.uploadPostPic(post, this.uploadedPost);
      return;
    });
  }; 



  this.ok = function () {
    this.close({$value: this.post});
  };

  this.cancel = function () {
    this.dismiss({$value: 'cancel'});
  };

}
