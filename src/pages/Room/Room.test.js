import React from 'react';
import ReactDOM from 'react-dom';
import Room from './Room';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Room />, div);
  ReactDOM.unmountComponentAtNode(div);
});