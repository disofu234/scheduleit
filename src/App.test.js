import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from 'App';

test('App renders TimePicker', () => {
  const { container } = render(<App />);
  expect(container.querySelector('.time-picker-wrap')).toBeInTheDocument();
});