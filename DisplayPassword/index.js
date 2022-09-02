/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './src/navigation/index';

AppRegistry.registerComponent(appName, () => App);
