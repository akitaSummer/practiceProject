import dva from 'dva';
import { createBrowserHistory as createHistory } from "history";

import './index.css';
import 'antd/dist/antd.css'

// 1. Initialize
const app = dva({
    history: createHistory() // 调整为H5的history模式
});

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);
// app.model(require('./models/product').default);
require('./models').default.forEach(key => app.model(key.default))

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
