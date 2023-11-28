import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { useSelectedProjectValue, useTasksValue } from '../context';
import { Tasks } from '../components/Tasks/Tasks';
import { useTasks } from '../hooks/useTasks/tasks';

beforeEach(cleanup); //clean the DOM

//mock context implementation
jest.mock('../context', () => ({
  useSelectedProjectValue: jest.fn(),
  useProjectsValue: jest.fn(() => ({
    projects: [
      {
        name: '🎯 React Basics',
        projectId: '1',
        userId: 'chtjuMWL3bEWyMN',
      },
    ],
  })),
}));

//mock hook implementation
jest.mock('../hooks/useTasks/tasks', () => ({
  useTasks: jest.fn(() => ({
    tasks: [
      {
        id: '81jDjygQhjQEIoe8mqSi',
        done: false,
        date: '27/12/2020',
        projectId: '1',
        task: 'some task',
        userId: 'chtjuMWL3bEWyMN',
      },
    ],
  })),
}));

//define a test suite on the component
describe('<Tasks/>', () => {
  //define a hook to run after each test to clear all mocks
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the <Tasks /> component with project title Inbox', () => {
    useSelectedProjectValue.mockImplementation(() => ({
      selectedProject: 'INBOX',
      setSelectedProject: jest.fn(() => 'INBOX'),
    }));
    const { queryByTestId } = render(<Tasks />);

    expect(queryByTestId('tasks')).toBeTruthy();
    expect(queryByTestId('project-name').textContent).toBe('Inbox');
  });

  it('renders the <Tasks /> component with no tasks', () => {
    useTasks.mockImplementation(() => ({
      tasks: [],
    }));
    const { queryByTestId } = render(<Tasks />);

    expect(queryByTestId('tasks')).toBeTruthy();
    expect(
      queryByTestId('tasks').classList.contains('tasks--empty')
    ).toBeTruthy();
  });

  it('renders the <Tasks /> component with project title 🎯 React Basics', () => {
    useSelectedProjectValue.mockImplementation(() => ({
      selectedProject: '1',
      setSelectedProject: jest.fn(() => '1'),
    }));
    const { queryByTestId } = render(<Tasks />);

    expect(queryByTestId('tasks')).toBeTruthy();
    expect(queryByTestId('project-name').textContent).toBe('🎯 React Basics');
    expect(document.title).toBe('🎯 React Basics: Todoist');
  });

  it('renders the <Tasks /> component with collated project title Next Week', () => {
    useSelectedProjectValue.mockImplementation(() => ({
      selectedProject: 'NEXT_7_DAYS',
      setSelectedProject: jest.fn(() => 'NEXT_7_DAYS'),
    }));
    const { queryByTestId } = render(<Tasks />);

    expect(queryByTestId('tasks')).toBeTruthy();
    expect(queryByTestId('project-name').textContent).toBe('Next Week');
    expect(document.title).toBe('Next Week: Todoist');
  });

  it('renders the <Tasks /> component with tasks from 🎯 React Basics', () => {
    useSelectedProjectValue.mockImplementation(() => ({
      selectedProject: '1',
      setSelectedProject: jest.fn(() => '1'),
    }));

    useTasks.mockImplementation(() => ({
      tasks: [
        {
          id: '81jDjygQhjQEIoe8mqSi',
          done: false,
          date: '27/12/2020',
          projectId: '1',
          task: 'some task',
          userId: 'chtjuMWL3bEWyMN',
        },
      ],
    }));
    const { queryByTestId, getByText } = render(<Tasks />);

    expect(queryByTestId('tasks')).toBeTruthy();
    expect(queryByTestId('project-name').textContent).toBe('🎯 React Basics');
    expect(getByText('some task')).toBeTruthy();
  });

  it('renders the <Tasks /> component with a done task from 🎯 React Basics', () => {
    useTasks.mockImplementation(() => ({
      tasks: [
        {
          id: '81jDjygQhjQEIoe8mqSi',
          done: true,
          date: '27/12/2020',
          projectId: '1',
          task: 'some task',
          userId: 'chtjuMWL3bEWyMN',
        },
      ],
    }));

    const { queryByTestId, getByText } = render(<Tasks />);

    expect(queryByTestId('tasks')).toBeTruthy();
    expect(queryByTestId('project-name').textContent).toBe('🎯 React Basics');
    expect(getByText('some task')).toBeTruthy();
    fireEvent.click(queryByTestId('delete-task'));
  });

  it('renders the <Tasks /> component with tasks from 🎯 React Basics and deletes a task', () => {
    useSelectedProjectValue.mockImplementation(() => ({
      selectedProject: '1',
      setSelectedProject: jest.fn(() => '1'),
    }));
    //    const deleteTasks = jest.fn();
    const { queryByTestId, getByText } = render(<Tasks />);

    expect(queryByTestId('tasks')).toBeTruthy();
    expect(queryByTestId('project-name').textContent).toBe('🎯 React Basics');
    expect(getByText('some task')).toBeTruthy();
    fireEvent.click(queryByTestId('delete-task'));
    //    expect(deleteTasks).toHaveBeenCalledTimes(1);
    //    expect(deleteTasks).toHaveBeenCalledWith(true);
  });
});
