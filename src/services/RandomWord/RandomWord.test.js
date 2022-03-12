import React from 'react';
import ReactDOM from 'react-dom';
import RandomWord from './RandomWord';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RandomWord />, div);
  ReactDOM.unmountComponentAtNode(div);
});