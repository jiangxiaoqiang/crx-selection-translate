import 'babel-polyfill';

import './commands';
import './install';
import './menus';
import './server';
import './badge';
import './pdf-sniffer';
import './reddwarf/auth/reddwarf-auth';
import ga from '../public/google-analysis';
ga( 'set' , 'page' , '/background-scripts/index.html' );
