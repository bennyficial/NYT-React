import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// This code here allows us to render our main component (in this case Parent)
ReactDOM.render(
    <App/>, document.getElementById("root"));

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
