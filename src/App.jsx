import React, { useState } from 'react';
import './App.scss';
import { Content } from './components/layout/Content/Content';
import { Header } from './components/layout/Header/Header';
import {
  ProjectsProvider,
  SelectedProjectProvider,
  TasksProvider,
} from './context';
import WithLayout from './hoc/Layout/WithLayout';
import { useLocalStorage } from './hooks/useLocalStorage/localStorage';
//import { addCollectionsAndDocs } from './helpers/firebase';

// const projectData = [
//   {
//     name: '🎯 React Basics',
//     projectId: 1,
//     userId: 'chtjuMWL3bEWyMN',
//     archived: false,
//   },
//   {
//     name: '🎷 Chat App',
//     projectId: 2,
//     userId: 'chtjuMWL3bEWyMN',
//     archived: false,
//   },
//   {
//     name: '🐶 Trello Clone',
//     projectId: 3,
//     userId: 'chtjuMWL3bEWyMN',
//     archived: false,
//   },
//   {
//     name: '🛒 React Ecomm',
//     projectId: 4,
//     userId: 'chtjuMWL3bEWyMN',
//     archived: false,
//   },
//   {
//     name: '🎲 Nodejs Learn',
//     projectId: 5,
//     userId: 'chtjuMWL3bEWyMN',
//     archived: false,
//   },
// ];

export const App = ({ darkModeDefault = false }) => {
  // useEffect(() => {
  //   addCollectionsAndDocs(
  //     'projects',
  //     projectData.map(({ name, projectId, userId, archived }) => ({
  //       name,
  //       projectId,
  //       userId,
  //       archived,
  //     }))
  //   );
  // }, []);

  const [showSidebar, setShowSidebar] = useState(true);
  const [darkMode, setDarkMode] = useLocalStorage('darkmode', darkModeDefault);

  return (
    <ProjectsProvider>
      <SelectedProjectProvider>
        <TasksProvider>
          <WithLayout darkMode={darkMode}>
            <Header
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              setShowSidebar={setShowSidebar}
              showSidebar={showSidebar}
            />
            <Content
              showSidebar={showSidebar}
              setShowSidebar={setShowSidebar}
            />
          </WithLayout>
        </TasksProvider>
      </SelectedProjectProvider>
    </ProjectsProvider>
  );
};
