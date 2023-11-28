import React, { useContext, createContext } from 'react';
import { useProjects } from '../hooks/useProjects/projects';

export const ProjectContext = createContext();

export const ProjectsProvider = ({ children }) => {
  const { projects, setProjects, projectsLoading } = useProjects();
  return (
    <ProjectContext.Provider value={{ projects, setProjects, projectsLoading }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectsValue = () => useContext(ProjectContext);
