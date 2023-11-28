import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { Content } from '../components/layout/Content/Content';

beforeEach(cleanup); //clean the DOM

//mock context implementation
jest.mock('../context', () => ({
  //  useSelectedProjectValue: jest.fn(),
  useProjectsValue: jest.fn(() => ({
    projects: [
      {
        name: '🎯 React Basics',
        projectId: '1',
        userId: 'chtjuMWL3bEWyMN',
      },
    ],
  })),

  useSelectedProjectValue: jest.fn(() => ({
    setSelectedProject: jest.fn(() => 'INBOX'),
  })),
}));

//define a test suite on the component
describe('<Content/>', () => {
  //define a hook to run after each test to clear all mocks
  afterEach(() => {
    jest.clearAllMocks();
  });
});

describe('<Content/> ', () => {
  it('renders the Content component ', () => {
    const { queryByTestId } = render(<Content showSidebar={true} />);
    expect(
      queryByTestId('content').classList.contains('sidebar--closed')
    ).toBeFalsy();
  });

  it('renders the Content component with sidebar closed', () => {
    const { queryByTestId } = render(<Content showSidebar={false} />);
    expect(
      queryByTestId('content').classList.contains('sidebar--closed')
    ).toBeTruthy();
  });

  it('renders the Content component and closes sidebar and overlay on click', () => {
    const setShowSidebar = jest.fn();
    const { queryByTestId } = render(
      <Content showSidebar={true} setShowSidebar={setShowSidebar} />
    );
    expect(
      queryByTestId('content').classList.contains('sidebar--closed')
    ).toBeFalsy();
    fireEvent.click(queryByTestId('sidebar-overlay'));
  });
});
