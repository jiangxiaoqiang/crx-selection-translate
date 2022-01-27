import client from './client';
import getOptions from '../public/default-options';
import {read} from '../public/clipboard';
import { defineComponent, h } from 'vue';
import Widget from '../public/widget/index';

export default defineComponent( { 
  client ,
  setup(){

  },
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
  components:{
    Widget: Widget
  },
  ready() {
    setTimeout( ()=> this.$els.textarea.focus() , 200 );
  },
  render() {
    return Widget;
  }
});
