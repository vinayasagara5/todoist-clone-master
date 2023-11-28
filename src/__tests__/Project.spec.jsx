import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { Project } from '../components/Projects/Project/Project';
import { useSelectedProjectValue } from '../context';

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
        projectId: 1,
        userId: 'chtjuMWL3bEWyMN',
      },
    ],
    setProjects: jest.fn(() => 'INBOX'),
  })),
}));

//mock firebase implementation
// jest.mock('../firebase', () => ({
//   firebase: {
//     firestore: jest.fn(() => ({
//       collection: jest.fn(() => ({
//         doc: jest.fn(() => ({
//           delete: jest.fn(() => Promise.resolve('Dont know what im doing')),
//         })),
//       })),
//     })),
//   },
// }));

jest.mock('../firebase', () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        doc: jest.fn(() => ({
          update: jest.fn(() => Promise.resolve('Dont know what im doing')),
          delete: jest.fn(() => Promise.resolve('Dont know what im doing')),
        })),
      })),
    })),
  },
}));

//mock firebase delete implementation
// jest.mock('../firebase', () => ({
//   firebase: {
//     firestore: jest.fn(() => ({
//       collection: jest.fn(() => ({
//         doc: jest.fn(() => ({
//           delete: jest.fn(() => Promise.resolve('Dont know what im doing')),
//         })),
//       })),
//     })),
//   },
// }));

//mock firebase implementation
// jest.mock('../firebase', () => ({
//   firebase: {
//     firestore: jest.fn(() => ({
//       collection: jest.fn(() => ({
//         doc: jest.fn(() => ({
//           update: jest.fn(() => Promise.resolve('Dont know what im doing')),
//         })),
//       })),
//     })),
//   },
// }));

// jest.mock('../firebase', () => ({
//   firebase: {
//     firestore: jest.fn(() => ({
//       collection: jest.fn(() => ({
//         doc: jest.fn(() => ({
//           update: jest.fn(),
//         })),
//       })),
//     })),
//   },
// }));

// jest.mock('../firebase', () => ({
//   firebase: {
//     firestore: jest.fn(() => ({
//       collection: jest.fn(() => ({
//         doc: jest.fn(() => {
//           update: jest.fn(() => Promise.resolve('Dont know what im doing'));
//         }),
//       })),
//     })),
//   },
// }));

const project = {
  name: '🎯 React Basics',
  archived: false,
  projectId: '1',
  userId: 'chtjuMWL3bEWyMN',
  docId: '1',
};

const archivedProject = {
  name: '🎯 React Advanced',
  archived: true,
  projectId: '1',
  userId: 'chtjuMWL3bEWyMN',
  docId: '1',
};

describe('<Project/>', () => {
  //define a hook to run after each test to clear all mocks
  afterEach(() => {
    jest.clearAllMocks();
  });
});

describe('Success ', () => {
  it('renders the single project', () => {
    const { getByText } = render(<Project project={project} />);
    expect(getByText('🎯 React Basics')).toBeTruthy();
  });

  it('renders the project and selects a project on click', () => {
    const setActive = jest.fn();
    useSelectedProjectValue.mockImplementation(() => ({
      selectedProject: '1',
      setSelectedProject: jest.fn(() => '1'),
    }));
    const { queryByTestId } = render(
      <Project project={project} setActive={setActive} />
    );
    expect(queryByTestId('project-single')).toBeTruthy();

    fireEvent.click(queryByTestId('project-single'));
    expect(
      queryByTestId('project-single').classList.contains(
        'sidebar__project-single'
      )
    ).toBeTruthy();
  });

  it('renders the single project and shows the project actions on click', () => {
    const setActive = jest.fn();

    const { queryByTestId } = render(
      <Project project={project} setActive={setActive} />
    );
    expect(queryByTestId('project-actions')).toBeTruthy();

    fireEvent.click(queryByTestId('project-actions'));
    expect(
      queryByTestId('project-actions-container').classList.contains(
        'sidebar__project-actions'
      )
    ).toBeTruthy();
  });

  it('renders the single project and shows the project actions on key down', () => {
    const setActive = jest.fn();

    const { queryByTestId } = render(
      <Project project={project} setActive={setActive} />
    );
    expect(queryByTestId('project-actions')).toBeTruthy();

    fireEvent.keyDown(queryByTestId('project-actions'));
    expect(
      queryByTestId('project-actions-container').classList.contains(
        'sidebar__project-actions'
      )
    ).toBeTruthy();
  });

  it('renders project and project actions with delete, rename and archive project action icons', () => {
    const setActive = jest.fn();
    const { queryByTestId, getByTitle } = render(
      <Project project={project} setActive={setActive} />
    );
    expect(queryByTestId('project-actions')).toBeTruthy();

    fireEvent.click(queryByTestId('project-actions'));
    expect(
      queryByTestId('project-actions-container').classList.contains(
        'sidebar__project-actions'
      )
    ).toBeTruthy();
    expect(getByTitle('Delete Project')).toBeTruthy();
    expect(getByTitle('Archive Project')).toBeTruthy();
    expect(getByTitle('Rename Project')).toBeTruthy();
  });

  it('renders project and project actions with Unarchive Project action icon ', () => {
    const setActive = jest.fn();
    const { queryByTestId, debug, getByTitle } = render(
      <Project project={archivedProject} setActive={setActive} />
    );
    expect(queryByTestId('project-actions')).toBeTruthy();

    fireEvent.click(queryByTestId('project-actions'));
    expect(
      queryByTestId('project-actions-container').classList.contains(
        'sidebar__project-actions'
      )
    ).toBeTruthy();

    expect(getByTitle('Unarchive Project')).toBeTruthy();
  });

  it('renders project and project actions and deletes project  on click ', () => {
    const setActive = jest.fn();
    const clickAction = jest.fn();

    useSelectedProjectValue.mockImplementation(() => ({
      selectedProject: '1',
      setSelectedProject: jest.fn(() => '1'),
    }));
    const { queryByTestId, debug, getByTitle } = render(
      <Project project={project} setActive={setActive} />
    );
    expect(queryByTestId('project-actions')).toBeTruthy();

    fireEvent.click(queryByTestId('project-actions'));
    expect(
      queryByTestId('project-actions-container').classList.contains(
        'sidebar__project-actions'
      )
    ).toBeTruthy();

    expect(getByTitle('Delete Project')).toBeTruthy();
    fireEvent.click(queryByTestId('deleteProject'));
    //    expect(clickAction).toHaveBeenCalledWith('deleteProject');
  });

  it('renders project and project actions and archives project  on click ', () => {
    const setActive = jest.fn();
    const clickAction = jest.fn();

    useSelectedProjectValue.mockImplementation(() => ({
      selectedProject: '1',
      setSelectedProject: jest.fn(() => '1'),
    }));
    const { queryByTestId, debug, getByTitle } = render(
      <Project project={project} setActive={setActive} />
    );
    expect(queryByTestId('project-actions')).toBeTruthy();

    fireEvent.click(queryByTestId('project-actions'));
    expect(
      queryByTestId('project-actions-container').classList.contains(
        'sidebar__project-actions'
      )
    ).toBeTruthy();

    expect(getByTitle('Archive Project')).toBeTruthy();
    fireEvent.click(queryByTestId('archiveProject'));
    //    expect(clickAction).toHaveBeenCalledWith('deleteProject');
  });

  // it('renders the single project with project actions menu and archives project on click', () => {
  //   const setActive = jest.fn();

  //   const { queryByTestId } = render(
  //     <Project project={project} setActive={setActive} />
  //   );
  //   expect(queryByTestId('project-actions')).toBeTruthy();

  //   fireEvent.click(queryByTestId('project-actions'));
  //   expect(
  //     queryByTestId('project-actions-container').classList.contains(
  //       'sidebar__project-actions'
  //     )
  //   ).toBeTruthy();

  //   fireEvent.click(queryByTestId('project-actions'));
  //   expect(
  //     queryByTestId('project-actions-container').classList.contains(
  //       'sidebar__project-actions'
  //     )
  //   ).toBeTruthy();

  // });
  // it('renders the delete project overlay and deletes project', () => {
  //   const { queryByTestId, getByText } = render(<Project project={project} />);

  //   fireEvent.click(queryByTestId('delete-project'));

  //   expect(
  //     getByText('Are you sure you want to delete the project ?')
  //   ).toBeTruthy();
  //   fireEvent.click(getByText('Delete'));
  // });

  // it('renders the delete project overlay and cancels delete modal on click', () => {
  //   const { queryByTestId, getByText } = render(<Project project={project} />);

  //   fireEvent.click(queryByTestId('delete-project'));

  //   expect(
  //     getByText('Are you sure you want to delete the project ?')
  //   ).toBeTruthy();
  //   fireEvent.click(getByText('Cancel'));
  // });

  // it('renders the delete project overlay and cancels delete modal on key down', () => {
  //   const { queryByTestId, getByText } = render(<Project project={project} />);

  //   fireEvent.keyDown(queryByTestId('delete-project'));

  //   expect(
  //     getByText('Are you sure you want to delete the project ?')
  //   ).toBeTruthy();
  //   fireEvent.keyDown(getByText('Cancel'));
  // });
});
