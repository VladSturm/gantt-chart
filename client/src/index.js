import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";
import {Provider} from 'mobx-react';
import Store from './stores/store'


const Root = (
    <Provider Store={Store}>
         <App />
    </Provider> 
)

ReactDOM.render(
         Root
    , document.getElementById("root"));
    if (module.hot) {
	module.hot.accept();
}