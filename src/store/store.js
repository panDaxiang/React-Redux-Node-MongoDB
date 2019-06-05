import { createStore, applyMiddleware, compose } from "redux";
// 支持dispatch异步
import thunk from "redux-thunk";

import reducer from "./reducer";

// 浏览器插件redux devtools支持处理
const enHancer = window.__REDUX_DEVTOOLS_EXTENSION__() || compose;

export default createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    enHancer
  )
);

