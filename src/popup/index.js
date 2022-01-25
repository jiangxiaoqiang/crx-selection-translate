import 'babel-polyfill';
import './popup.scss';
import './app';
import ga from '../public/google-analysis';

ga( 'set' , 'page' , '/popup/index.html' );
ga( 'send' , 'pageview' );
