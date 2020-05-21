import { fun, fun2 } from './content';
import data from '../json/data.json';

import '../css/test.css';
import '../css/index.scss'

document.write("entry.js is work");
document.write('<br />' + fun(3))
document.write('<br />' + fun2(3))
document.write('<br />' + JSON.stringify(data));

if (module.hot) {
  module.hot.accept('./content', () => {
    // ./content.js 文件改变后，进行一些事情，例如更新 HMR热更新引入后才有用
  })
}
