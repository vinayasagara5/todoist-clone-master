import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Header } from '../components/layout/Header/Header';

beforeEach(cleanup); //clean the DOM

//mock context implementation
jest.mock('../context', () => ({
  useSelectedProjectValue: jest.fn(() => ({ selectedProject: '1' })),
  useProjectsValue: jest.fn(() => ({
    projects: [
      {
        name: 'Office',
        projectId: '1',
        userId: 'chtjuMWL3bEWyMN',
      },
    ],
  })),
}));

//define a test suite on the component
describe('<Header />', () => {
  //define a hook to run after each test to clear all mocks
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the <Header /> component', () => {
    const { queryByTestId } = render(<Header />);

    expect(queryByTestId('header')).toBeTruthy();
  });

  it('renders the <Header /> component and activates Dark mode on Click', () => {
    const darkMode = false;
    const setDarkMode = jest.fn(() => !darkMode);
    const { queryByTestId } = render(
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
    );

    expect(queryByTestId('header')).toBeTruthy();

    fireEvent.click(queryByTestId('dark-mode-action'));
    expect(setDarkMode).toHaveBeenCalledTimes(1);
    expect(setDarkMode).toHaveBeenCalledWith(true);
  });

  it('renders the <Header /> component and deactivates Dark mode on Click', () => {
    const darkMode = true;
    const setDarkMode = jest.fn(() => !darkMode);
    const { queryByTestId } = render(
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
    );

    expect(queryByTestId('header')).toBeTruthy();

    fireEvent.click(queryByTestId('dark-mode-action'));
    expect(setDarkMode).toHaveBeenCalledTimes(1);
    expect(setDarkMode).toHaveBeenCalledWith(false);
  });

  it('renders the <Header /> component and shows Sun icon on Click', () => {
    const darkMode = true;
    const setDarkMode = jest.fn(() => !darkMode);
    const { queryByTestId } = render(
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
    );

    expect(queryByTestId('header')).toBeTruthy();

    fireEvent.click(queryByTestId('dark-mode-action'));
    expect(queryByTestId('sun-icon')).toBeTruthy();
  });

  it('renders the <Header /> component and shows Moon icon on Click', () => {
    const darkMode = false;
    const setDarkMode = jest.fn(() => !darkMode);
    const { queryByTestId } = render(
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
    );

    expect(queryByTestId('header')).toBeTruthy();

    fireEvent.click(queryByTestId('dark-mode-action'));
    expect(queryByTestId('moon-icon')).toBeTruthy();
  });

  it('renders the <Header /> component and opens Quick add task on Click', () => {
    const { queryByTestId } = render(<Header />);

    expect(queryByTestId('header')).toBeTruthy();

    fireEvent.click(queryByTestId('quick-add-task-action'));
    expect(queryByTestId('quick-add-task')).toBeTruthy();
  });

  it('renders the <Header /> component and opens Quick add task on key Down', () => {
    const { queryByTestId } = render(<Header />);

    expect(queryByTestId('header')).toBeTruthy();

    fireEvent.keyDown(queryByTestId('quick-add-task-action'));
    expect(queryByTestId('quick-add-task')).toBeTruthy();
  });

  // it('renders the <Header /> component and toggles sidebar on click', () => {
  //   const showSidebar = true;
  //   const setShowSidebar = jest.fn(() => !showSidebar);

  //   const { queryByTestId, debug } = render(
  //     <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
  //   );

  //   expect(queryByTestId('header')).toBeTruthy();
  //   debug();

  //   fireEvent.click(queryByTestId('toggle-sidebar'));
  //   debug();
  //   expect(
  //     queryByTestId('show-sidebar').classList.contains('sidebar-closed')
  //   ).toBeTruthy();
  // });

  it('renders the <Header /> component and closes Sidebar on Click', () => {
    const showSidebar = true;
    const setShowSidebar = jest.fn(() => !showSidebar);

    const { queryByTestId } = render(
      <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
    );

    expect(queryByTestId('header')).toBeTruthy();

    fireEvent.click(queryByTestId('toggle-sidebar'));
    expect(setShowSidebar).toHaveBeenCalledTimes(1);
    expect(setShowSidebar).toHaveBeenCalledWith(false);
  });

  it('renders the <Header /> component and opens Sidebar on Click', () => {
    const showSidebar = false;
    const setShowSidebar = jest.fn(() => !showSidebar);

    const { queryByTestId } = render(
      <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
    );

    expect(queryByTestId('header')).toBeTruthy();

    fireEvent.click(queryByTestId('toggle-sidebar'));
    expect(setShowSidebar).toHaveBeenCalledTimes(1);
    expect(setShowSidebar).toHaveBeenCalledWith(true);
  });

  // it('renders the <Header /> component and opens sidebar on click', () => {
  //   const showSidebar = false;
  //   const setShowSidebar = jest.fn(() => !showSidebar);

  //   const { queryByTestId } = render(
  //     <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
  //   );

  //   expect(queryByTestId('header')).toBeTruthy();

  //   fireEvent.click(queryByTestId('toggle-sidebar'));
  //   expect(
  //     queryByTestId('show-sidebar').classList.contains('sidebar-closed')
  //   ).toBeTruthy();
  // });
});
