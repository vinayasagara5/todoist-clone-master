import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { FaPencilAlt, FaArchive, FaTrash } from 'react-icons/fa';
import { Dropdown } from '../ui/Dropdown/Dropdown';
import { useSelectedProjectValue, useTasksValue } from '../context';
import { useTasks } from '../hooks/useTasks/tasks';

beforeEach(cleanup); //clean the DOM

const menuValues = [
  {
    icon: <FaPencilAlt />,
    name: 'Rename Project',
    type: 'renameProject',
    projectId: '1',
  },
  {
    icon: <FaTrash />,
    name: 'Delete Project',
    type: 'deleteProject',
    projectId: '2',
  },
  {
    icon: <FaArchive />,
    name: 'Archive Project',
    type: 'archiveProject',
    projectId: '3',
  },
];

//define a test suite on the component
describe('<Dropdown/>', () => {
  //define a hook to run after each test to clear all mocks
  afterEach(() => {
    jest.clearAllMocks();
  });
});

describe('render <Dropdown/> component', () => {
  it('renders the <Dropdown /> component', () => {
    const { queryByTestId } = render(<Dropdown />);

    expect(queryByTestId('custom-dropdown')).toBeTruthy();
  });

  it('renders the <Dropdown /> component and opens dropdown on click', () => {
    const customClass = 'anyClass';
    const { queryByTestId } = render(<Dropdown customClass={customClass} />);

    expect(queryByTestId('custom-dropdown')).toBeTruthy();
    fireEvent.click(queryByTestId('custom-dropdown-button'));
  });

  it('renders the <Dropdown /> component and renders options passed', () => {
    const customClass = 'anyClass';
    const { queryByTestId, debug, getByText } = render(
      <Dropdown customClass={customClass} options={menuValues} />
    );

    expect(queryByTestId('custom-dropdown')).toBeTruthy();
    fireEvent.click(queryByTestId('custom-dropdown-button'));
    expect(getByText('Rename Project')).toBeTruthy();
  });

  it('renders the <Dropdown /> component with options and selects option', () => {
    const customClass = 'anyClass';
    const clickHandler = jest.fn();

    const { queryByTestId, debug, getByText } = render(
      <Dropdown
        customClass={customClass}
        options={menuValues}
        clickHandler={clickHandler}
      />
    );

    expect(queryByTestId('custom-dropdown')).toBeTruthy();
    fireEvent.click(queryByTestId('custom-dropdown-button'));
    expect(getByText('Rename Project')).toBeTruthy();
    fireEvent.click(queryByTestId('3--list'));
  });

  it('renders the <Dropdown /> component with options and removes options on esc key press', () => {
    const customClass = 'anyClass';
    const clickHandler = jest.fn();

    const { queryByTestId, domNode, debug, getByText } = render(
      <Dropdown
        customClass={customClass}
        options={menuValues}
        clickHandler={clickHandler}
      />
    );

    expect(queryByTestId('custom-dropdown')).toBeTruthy();
    fireEvent.click(queryByTestId('custom-dropdown-button'));

    expect(getByText('Rename Project')).toBeTruthy();
    fireEvent.keyUp(queryByTestId('custom-dropdown'), {
      key: 'Escape',
      code: 'Escape',
    });
  });
});
