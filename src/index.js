import React from 'react';
import ReactDOM from 'react-dom';
import MainContainer from './containers/MainContainer';
import {
  isBrowser
} from "react-device-detect";


const app = 
isBrowser ? <div>visible on mobile only</div> : <MainContainer />

ReactDOM.render(app, document.getElementById('root'));