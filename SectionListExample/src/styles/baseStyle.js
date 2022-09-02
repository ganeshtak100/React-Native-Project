import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');
const MAXWIDTH = width;
const MAXHEIGHT = height;

const w = _width => width * (_width / 100);
const h = _height => height * (_height / 100);
// console.log('first,=====', height * (20 / 100));

const totalSize = num =>
  (Math.sqrt(height * height + width * width) * num) / 100;
// console.log('totalSize,', (Math.sqrt(height * height + width * width) * 0.5) / 100);
const spacer = totalSize(2);
// console.log(':spacer value', spacer);

export {w, h, MAXHEIGHT, MAXWIDTH, totalSize, spacer};
