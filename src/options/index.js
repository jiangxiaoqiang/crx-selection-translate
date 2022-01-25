import 'babel-polyfill';
import Vue from 'vue';
import VueRouter from 'vue-router';

import './options.scss';

import ga from '../public/google-analysis';
ga( 'set' , 'page' , '/options/index.html' );
ga( 'send' , 'pageview' );

import settings from './settings/index';
import about from './about/index';

/* istanbul ignore if */
if ( process.env.NODE_ENV !== 'testing' ) {
  Vue.use( VueRouter );
  const router = new VueRouter();

  router.map( {
    '/options' : {
      name : 'options' ,
      component : settings
    } ,
    '/about' : {
      name : 'about' ,
      component : about
    }
  } );

  router.redirect( {
    '*' : '/options'
  } );
  router.start( {} , '#app' );
}
