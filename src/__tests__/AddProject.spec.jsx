import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { AddProject } from '../components/Projects/AddProject/AddProject';
import { useSelectedProjectValue, useProjectsValue } from '../context';

beforeEach(cleanup); //clean the DOM

//mock firebase implementation
jest.mock('../firebase', () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        add: jest.fn(() => Promise.resolve('Dont know what im doing')),
      })),
    })),
  },
}));

//mock context

jest.mock('../context', () => ({
  useProjectsValue: jest.fn(() => ({
    projects: [
      {
        name: '🎯 React Basics',
        projectId: '1',
        userId: 'chtjuMWL3bEWyMN',
      },
      {
        name: '🎷 Chat App',
        projectId: '2',
        userId: 'chtjuMWL3bEWyMN',
      },
      {
        name: '🐶 Trello Clone',
        projectId: '3',
        userId: 'chtjuMWL3bEWyMN',
      },
      {
        name: '🛒 React Ecomm',
        projectId: '4',
        userId: 'chtjuMWL3bEWyMN',
      },
      {
        name: '🎲 Nodejs Learn',
        projectId: '5',
        userId: 'chtjuMWL3bEWyMN',
      },
    ],
    setProjects: jest.fn(),
  })),
  useSelectedProjectValue: jest.fn(() => ({ selectedProject: '1' })),
  setSelectedProject: jest.fn(() => '1'),
}));

describe('<AddProject />', () => {
  //define a hook to run after each test to clear all mocks
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the <AddProject /> component', () => {
    const { queryByTestId } = render(<AddProject />);
    expect(queryByTestId('add-project')).toBeTruthy();
  });

  it('renders the <AddProject /> component with Add project Modal', () => {
    const { queryByTestId } = render(<AddProject shouldShow={true} />);
    expect(queryByTestId('add-project-container')).toBeTruthy();
  });

  it('renders the <AddProject /> component and opens Add project Modal on Click', () => {
    const { queryByTestId } = render(<AddProject shouldShow={false} />);

    fireEvent.click(queryByTestId('add-project-action'));
    expect(queryByTestId('add-project-container')).toBeTruthy();
  });

  it('renders the <AddProject /> component and adds Project on Click', () => {
    const setActive = jest.fn();
    useSelectedProjectValue.mockImplementation(() => ({
      selectedProject: '1',
      setSelectedProject: jest.fn(() => '1'),
    }));
    const { queryByTestId } = render(
      <AddProject setActive={setActive} shouldShow={true} />
    );
    expect(queryByTestId('add-project-container')).toBeTruthy();

    fireEvent.change(queryByTestId('project-name'), {
      target: { value: 'I am a new Project ' },
    });
    expect(queryByTestId('project-name').value).toBe('I am a new Project ');

    fireEvent.click(queryByTestId('add-project-button'));
  });

  it('renders the <AddProject /> component and fails to add a project', () => {
    const setActive = jest.fn();
    useProjectsValue.mockImplementation(() => ({
      projects: [
        {
          name: '🎯 Failed Test',
          projectId: '1',
          userId: 'chtjuMWL3bEWyMN',
        },
      ],
      setProjects: jest.fn(),
    }));

    const { queryByTestId } = render(
      <AddProject setActive={setActive} shouldShow={true} />
    );

    expect(queryByTestId('add-project-container')).toBeTruthy();

    fireEvent.change(queryByTestId('project-name'), {
      target: { value: 'I am a new Project ' },
    });
    expect(queryByTestId('project-name').value).toBe('I am a new Project ');

    fireEvent.click(queryByTestId('add-project-button'));
  });

  it('closes the <AddProject /> modal when cancel is clicked', () => {
    const { queryByTestId } = render(<AddProject shouldShow />);

    expect(queryByTestId('add-project-container')).toBeTruthy();

    fireEvent.click(queryByTestId('add-project-cancel'));
    expect(queryByTestId('add-project-container')).toBeFalsy();
  });
});
