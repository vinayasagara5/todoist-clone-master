import React from 'react';
import { AddProject } from './AddProject/AddProject';
import { Project } from './Project/Project';

export const Projects = ({ active, setActive, projects, projectType }) => {
  return (
    <>
      {projects &&
        projects.map((project) => (
          <li
            data-testid="project-list"
            key={project.projectId}
            data-doc-id={project.docId}
            className={
              active === project.projectId
                ? ' active sidebar__project'
                : 'sidebar__project'
            }
          >
            <Project project={project} setActive={setActive} />
          </li>
        ))}
      {projectType !== 'archived' && <AddProject setActive={setActive} />}
    </>
  );
};
