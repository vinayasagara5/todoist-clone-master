import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { App } from '../App';

//clean the DOM
beforeEach(cleanup);

//initialize mock local storage
beforeEach(() => {
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn(() => null),
      setItem: jest.fn(() => null),
    },
    writable: true,
  });
});

describe('<App />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('renders the application', () => {
    const { queryByTestId, debug } = render(<App />);
  });
});
