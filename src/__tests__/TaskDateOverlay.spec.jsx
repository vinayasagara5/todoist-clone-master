import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { TaskDateOverlay } from '../components/Projects/TaskDateOverlay/TaskDateOverlay';

beforeEach(cleanup); //clean the DOM

//define a test suite on the component
describe('<TaskDateOverlay/>', () => {
  //define a hook to run after each test to clear all mocks
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the <TaskDateOverlay /> component ', () => {
    const { queryByTestId } = render(
      <TaskDateOverlay showTaskdateOverlay={true} />
    );

    expect(queryByTestId('task-date-overlay')).toBeTruthy();
  });

  it('renders the <TaskDateOverlay /> component and sets task date to Today on click ', () => {
    const setTaskDate = jest.fn();
    const setShowTaskdateOverlay = jest.fn();

    const { queryByTestId, getByText } = render(
      <TaskDateOverlay
        showTaskdateOverlay={true}
        setShowTaskdateOverlay={setShowTaskdateOverlay}
        setTaskDate={setTaskDate}
      />
    );

    expect(queryByTestId('task-date-overlay')).toBeTruthy();
    fireEvent.click(queryByTestId('taskdate-today'));
  });

  it('renders the <TaskDateOverlay /> component and sets task date to Tomorrow on click ', () => {
    const setTaskDate = jest.fn();
    const setShowTaskdateOverlay = jest.fn();

    const { queryByTestId, getByText } = render(
      <TaskDateOverlay
        showTaskdateOverlay={true}
        setShowTaskdateOverlay={setShowTaskdateOverlay}
        setTaskDate={setTaskDate}
      />
    );

    expect(queryByTestId('task-date-overlay')).toBeTruthy();
    fireEvent.click(queryByTestId('taskdate-tomorrow'));
  });

  it('renders the <TaskDateOverlay /> component and sets task date to Next Week on click ', () => {
    const setTaskDate = jest.fn();
    const setShowTaskdateOverlay = jest.fn();

    const { queryByTestId, getByText } = render(
      <TaskDateOverlay
        showTaskdateOverlay={true}
        setShowTaskdateOverlay={setShowTaskdateOverlay}
        setTaskDate={setTaskDate}
      />
    );

    expect(queryByTestId('task-date-overlay')).toBeTruthy();
    fireEvent.click(queryByTestId('taskdate-next-week'));
  });
});
