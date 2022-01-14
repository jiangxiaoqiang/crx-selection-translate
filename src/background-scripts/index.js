import 'babel-polyfill';

//import 'translation.js/chrome-youdao'
import './commands';
import './install';
import './menus';
import './server';
import './badge';
import './pdf-sniffer';
import './reddwarf/auth/reddwarf-auth';
// TODO: 功能未测试，先暂时注释掉
// import './shanbay';

import ga from '../public/ga';
ga( 'set' , 'page' , '/background-scripts/index.html' );
