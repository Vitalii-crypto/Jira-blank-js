import * as React from 'react';
import * as ReactDOM from "react-dom";

import App from './App';
import "./styles.less";


const mountNode = document.getElementById("app");
ReactDOM.render(
        <App/>
    , mountNode);

