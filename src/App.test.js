import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/board';

it('renders the board without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Board />, div);
  ReactDOM.unmountComponentAtNode(div);
});
