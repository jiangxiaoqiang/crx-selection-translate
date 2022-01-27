/**
 * @files the fundation ST component
 */
import '../fontello/css/selection-translator.css';
import './style.scss';
import { defineComponent } from 'vue';
import widgetMixin from './vue-st';
import chromeCall from 'chrome-call';
import locales from '../locales';
import template from './template.html';

const translateLocales = [];

locales.forEach( locale => {
  const {localeId} = locale;

  if ( !localeId.includes( '-' ) || ( localeId === 'zh-CN' || localeId == 'zh-TW' || localeId == 'zh-HK' ) ) {
    translateLocales.push( locale );
  }
} );

const resolvedEmptyPromise = Promise.resolve() ,
  noop = ()=> {};

export default defineComponent( {
  template ,
  data : ()=>({
    access_token: '',
    locales : translateLocales ,
    showForm : false ,
    query : {
      text : '' ,
      from : '' ,
      to : '' ,
      api : ''
    } ,
    result : {
      error : '' ,
      phonetic : '' ,
      dict : [] ,
      result : [] ,
      link : '',
    }
  }) ,
  created() {
    this.$options.client.on( 'disconnect' , ()=> {
      alert("disconnect");
      this.result = {
        error : 'index连接到翻译引擎时发生了错误，请刷新网页或重启浏览器后再试。'
      }
    } );
  } ,
  computed : {
    apiName() {
      return {
        YouDao: '有道翻译',
        Google: '谷歌翻译',
        GoogleCN: '谷歌翻译（国内）',
        BaiDu: '百度翻译',
        Reddwarf: '红矮星翻译'
      }[this.query.api] || ''
    }
  },
  methods : {

    /**
     * 翻译快捷键：Ctrl + Enter
     * @param event
     */
    ctrlEnter( event ) {
      if ( event.ctrlKey ) {
        this.safeTranslate();
      }
    } ,

    /**
     * 仅当有文本时才翻译
     */
    safeTranslate() {
      if ( this.query.text.trim() ) {
        this.translate();
      }
    } ,

    /**
     * 从后台网页获取查询结果
     * @returns {Promise}
     */
    getResult() {
      if ( this.$options.client.disconnected ) {
        alert("disconnectedddd");
        return resolvedEmptyPromise;
      }
      return this.$options.client
        .send( 'get translate result' , this.query , true )
        .then( resultObj => {
          debugger;
          if ("200" !==resultObj.response.statusCode||"200" !== resultObj.response.resultCode) {
            let errMsg = {
              NETWORK_ERROR: '网络错误，请检查你的网络设置。',
              API_SERVER_ERROR: '接口返回了错误的数据，请稍候重试。',
              UNSUPPORTED_LANG: '不支持的语种，请使用谷歌翻译重试。',
              NETWORK_TIMEOUT: '查询超时：5 秒内没有查询到翻译结果，已中断查询。'
            }[resultObj.code]
            if (resultObj.error) {
              errMsg += resultObj.error
            }
            this.result = {error: errMsg}
          } else {
            const {phonetic} = resultObj;
            this.result = resultObj;
            this.result.error = '';
            this.result.phonetic = resultObj.response.result.translation;
          }
        } , noop );
    } ,

    /**
     * 
     */
    exchangeLocale() {
      const {to,from} = this.query;
      this.query.to = from;
      this.query.from = to;
    } ,

    /**
     * open the setting page
     */
    openOptions() {
      this.$options.client.send( 'open options' );
    } ,

    /**
     * 
     * @param {String|String[]} textOrTextArray
     * @param {MouseEvent} event
     */
    copy( textOrTextArray , event ) {
      if ( Array.isArray( textOrTextArray ) ) {
        textOrTextArray = textOrTextArray.join( '\n' );
      }
      this.$options.client.send( 'copy' , textOrTextArray );

      const {target} = event ,
        original = target.textContent;
      target.textContent = '已复制';
      setTimeout( ()=> target.textContent = original , 2000 );
    } ,
    /**
     * add words
     * @param {String|String[]} textOrTextArray
     * @param {MouseEvent} event
     */
    addWord(text, event) {
      chromeCall('storage.local.get', ['access_token'])
        .then((res) => {
          if (res.access_token) {
            this.access_token = res.access_token;
            this.queryWord(text, event);
          } else {
            alert('未绑定扇贝账号，请授权绑定')
            this.gotoAccessToken();
          }
        });
    },
    /**
     * add words
     * @param {String|String[]} textOrTextArray
     * @param {MouseEvent} event
     */
     addGlossary(text, event) {
      chromeCall('storage.local.get', ['reddwarf_access_token'])
        .then((res) => {
          if (res.access_token) {
            this.access_token = res.access_token;
            this.queryWord(text, event);
          } else {
            alert('未绑定红矮星账号，请授权绑定')
            this.gotoReddwarfAccessToken();
          }
        });
    },
    gotoAccessToken() {
      chrome.runtime.sendMessage({ action: 'shanbay_authorize' })
    },
    gotoReddwarfAccessToken() {
      chrome.runtime.sendMessage({ action: 'reddwarf_authorize' })
    },
    queryWord(text, event) {
      let params = { word: text, access_token: this.access_token }
      request.get('https://api.shanbay.com/bdc/search/')
        .query(params)
        .end((err, res) => {
          switch (res.status) {
            case 200:
              let info = res.body
              if (info.status_code == 0) {
                this.realAddWord(info.data.id, event);
              } else {
                alert(`查词错误, ${info.msg}`)
              }
              break;
            case 401:
              alert('token 失效，请重新授权')
              this.gotoAccessToken()
              break;
            case 429:
              alert('今日请求次数过多')
              break;
            default:
              alert(`未知错误, ${err}`)
              break;
          }
        })
    },

    realAddWord(id, event) {
      let params = { id: id, access_token: this.access_token }
      request.post('https://api.shanbay.com/bdc/learning/')
        .type('form')
        .send(params)
        .end((err, res) => {
          switch (res.status) {
            case 200:
              let info = res.body
              if (info.status_code == 0) {
                const { target } = event;
                let original = target.textContent;
                target.textContent = '已添加';
                setTimeout(() => target.textContent = original, 2000);
              } else {
                alert(`添加单词发生错误, ${info.msg}`)
              }
              break;
            default:
              alert(`添加单词发生错误, ${err}`)
              break;
          }
        })
    },

    /**
     * 
     * @param {String|String[]} textOrTextArray
     * @param {String} [lang] - 
     */
    play( textOrTextArray , lang ) {
      if ( Array.isArray( textOrTextArray ) ) {
        textOrTextArray = textOrTextArray.join( '\n' );
      }
      this.$options.client.send( 'play' , {
        text : textOrTextArray ,
        api : this.query.api ,
        from : lang
      } );
    }
  } ,
  mixins : [ widgetMixin ]
} );

