import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { Projects } from '../components/Projects/Projects';

beforeEach(cleanup); //clean the DOM

//mock context implementation
jest.mock('../context', () => ({
  useSelectedProjectValue: jest.fn(() => ({
    setSelectedProject: jest.fn(() => 'INBOX'),
  })),

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

const projects = [
  {
    name: '🎯 React Basics',
    archived: false,
    projectId: '1',
    userId: 'chtjuMWL3bEWyMN',
  },
];

//define a test suite on the component
describe('<Projects/>', () => {
  //define a hook to run after each test to clear all mocks
  afterEach(() => {
    jest.clearAllMocks();
  });
});

describe('Success ', () => {
  it('renders the projects list', () => {
    const { queryByTestId } = render(<Projects projects={projects} />);

    expect(queryByTestId('project-list')).toBeTruthy();
  });

  it('renders the projects list with active project', () => {
    const { queryByTestId } = render(
      <Projects projects={projects} active="1" />
    );

    expect(queryByTestId('project-list')).toBeTruthy();
    expect(queryByTestId('project-list').classList.contains('active'));
  });

  // it('renders the projects list and selects a project on click', () => {
  //   const setActive = jest.fn();

  //   const { queryByTestId } = render(
  //     <Projects active="1" setActive={setActive} />
  //   );
  //   expect(queryByTestId('project-action')).toBeTruthy();

  //   fireEvent.click(queryByTestId('project-action'));
  //   expect(
  //     queryByTestId('project-list').classList.contains('active')
  //   ).toBeTruthy();
  // });

  // it('renders the projects list and selects a project on keyDown', () => {
  //   const setActive = jest.fn();

  //   const { queryByTestId } = render(
  //     <Projects active="1" setActive={setActive} />
  //   );
  //   expect(queryByTestId('project-action')).toBeTruthy();

  //   fireEvent.keyDown(queryByTestId('project-action'));
  //   expect(
  //     queryByTestId('project-list').classList.contains('active')
  //   ).toBeTruthy();
  // });

  // it('renders the projects list', () => {
  //   const { queryByTestId, debug } = render(<Projects />);
  //   debug();
  //   expect(queryByTestId('project-list')).toBeTruthy();

  //   fireEvent.keyDown(queryByTestId('project-action'));
  //   expect(
  //     queryByTestId('project-list').classList.contains('active')
  //   ).toBeTruthy();
  // });

  // it('renders the projects list with active Project', () => {
  //   const setActive = jest.fn();

  //   const { queryByTestId } = render(
  //     <Projects active="1" setActive={setActive} />
  //   );
  //   expect(queryByTestId('project-action')).toBeTruthy();

  //   fireEvent.keyDown(queryByTestId('project-action'));
  //   expect(
  //     queryByTestId('project-list').classList.contains('active')
  //   ).toBeTruthy();
  // });
});
