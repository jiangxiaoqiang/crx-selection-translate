
import client from './client';
import getOptions from '../public/default-options';
import {read} from '../public/clipboard';
import { defineComponent } from 'vue';

export default defineComponent( { 
  client ,
  async compiled() {
    this.inline = true;
    this.showForm = true;
    const {defaultApi , autoClipboard} = await getOptions( [ 'defaultApi' , 'autoClipboard' ] );

    this.query.api = defaultApi;
    if ( autoClipboard ) {
      this.query.text = read();
      this.safeTranslate();
    }
  } ,
  ready() {
    setTimeout( ()=> this.$els.textarea.focus() , 200 );
  }
} );
