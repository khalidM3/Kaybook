'use strict';

require('./scss/main.scss');

const path = require('path');
const angular = require('angular');
const camelcase = require('camelcase');
const pascalcase = require('pascalcase');
const uiRouter = require('angular-ui-router');
const ngTouch = require('angular-touch');
const ngAnimate = require('angular-animate');
const uiBootstrap = require('angular-ui-bootstrap');
const ngFileUpload = require('ng-file-upload');
const ngRoute = require('angular-route');
const btford = require('angular-socket-io');


const kproject = angular.module('kproject', [ngTouch, ngAnimate, uiRouter, uiBootstrap, ngRoute, ngFileUpload, 'btford.socket-io']);

let context = require.context('./config/', true, /\.js$/);
context.keys().forEach( key => {
  kproject.config(context(key));
});

context = require.context('./view/', true, /\.js$/);
context.keys().forEach( key => {
  let name =  pascalcase(path.basename(key, '.js'));
  let module = context(key);
  kproject.controller(name, module);
});

context = require.context('./service/', true, /\.js$/);
context.keys().forEach( key => {
  let name = camelcase(path.basename(key, '.js'));
  let module = context(key);
  kproject.service(name, module);
});

context = require.context('./component/', true, /\.js$/);
context.keys().forEach( key => {
  let name = camelcase(path.basename(key, '.js'));
  let module = context(key);
  kproject.component(name, module);
});

context = require.context('./filter/', true, /\.js$/);
context.keys().forEach( key => {
  let name = camelcase(path.basename(key, '.js'));
  let module = context(key);
  kproject.filter(name, module);
});
