import React from 'react';
import ReactDOM from 'react-dom';
import AddWord from './AddWord';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddWord />, div);
  ReactDOM.unmountComponentAtNode(div);
});