
import Vue from 'vue';
import template from './tpl.html';
import chromeCall from 'chrome-call';
import getOptions from '../public/default-options';
import {getTabLocation,isHostEnabled} from '../public/util';
import ST from './st';

export const appOptions = {
  el : 'app' ,
  template ,
  data : {
    _host : null ,
    canInject : false ,
    enabled : false
  } ,
  methods : {
    async switchEnable() {
      const {_host} = this.$data ,
        enabled = this.enabled = !this.enabled ,
        {excludeDomains} = await getOptions( 'excludeDomains' );

      if ( enabled ) {
        excludeDomains.splice( excludeDomains.indexOf( _host ) , 1 );
      } else {
        excludeDomains.push( _host );
      }
      return chromeCall( 'storage.local.set' , { excludeDomains } );
    }
  } ,
  components : {
    'st-box' : ST
  } ,
  async ready() {
    const locationObj = await getTabLocation();
    if ( locationObj ) {
      this.$data._host = locationObj.host;
      this.canInject = true;
      this.enabled = await isHostEnabled( locationObj );
    }
  }
};

/* istanbul ignore if */
if ( process.env.NODE_ENV !== 'testing' ) {
  window.onload = ()=> {
    setTimeout( ()=> new Vue( appOptions ) , 0 );
  };
}
