import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { PureWithLayout as WithLayout } from '../hoc/Layout/WithLayout';

beforeEach(cleanup); //clean the DOM

//define a test suite on the component
describe('<WithLayout/>', () => {
  //define a hook to run after each test to clear all mocks
  afterEach(() => {
    jest.clearAllMocks();
  });
});

describe('<WithLayout/> ', () => {
  it('renders the WithLayout component ', () => {
    const { queryByTestId } = render(<WithLayout />);

    // expect(queryByTestId('application')).toBeTruthy();
  });

  it('renders the WithLayout component with dark mode', () => {
    const { queryByTestId } = render(<WithLayout darkMode={true} />);

    // expect(queryByTestId('application')).toBeTruthy();
    // expect(
    //   queryByTestId('application').classList.contains('darkmode')
    // ).toBeTruthy();
  });
});
