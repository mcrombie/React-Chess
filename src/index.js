import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import QuoteGenerator from './components/quoteGenerator'
import Board from './components/board';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(<QuoteGenerator />, document.getElementById('quote-generator-root'));
ReactDOM.render(<Board />, document.getElementById('board-root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
