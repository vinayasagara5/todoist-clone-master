import React from 'react';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

import { useProjectsValue, useSelectedProjectValue } from '../../../context';
import { firebase } from '../../../firebase';
import { generatePushId } from '../../../helpers';

export const AddProject = ({ shouldShow = false, setActive }) => {
  const [show, setShow] = useState(shouldShow);
  const [projectName, setProjectName] = useState('');
  const { projects, setProjects } = useProjectsValue();
  const { setSelectedProject } = useSelectedProjectValue();

  const projectId = generatePushId();
  const addProject = () => {
    projectName &&
      firebase
        .firestore()
        .collection('projects')
        .add({
          projectId,
          name: projectName,
          userId: 'chtjuMWL3bEWyMN',
          archived: false,
        })
        .then((docRef) => {
          setProjects([...projects]);
        });
    // .catch(function (error) {
    //   console.error('Error adding document: ', error);
    // });
    setActive(projectId);
    setSelectedProject(projectId);
    setProjectName('');
    setShow(false);
  };
  return (
    <div className="add-project" data-testid="add-project">
      {show && (
        <div className="add-project__input" data-testid="add-project-container">
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Project Name"
            data-testid="project-name"
            className="add-project__name"
          />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
              onClick={() => addProject()}
              className="add-project__submit"
              data-testid="add-project-button"
              disabled={!projectName}
            >
              Add Project
            </button>
            <span
              onClick={() => setShow(false)}
              className="add-project__cancel"
              data-testid="add-project-cancel"
            >
              Cancel
            </span>
          </div>
        </div>
      )}
      {!show && (
        <div
          className="add-project__action"
          data-testid="add-project-action"
          onClick={() => setShow(!show)}
        >
          <FaPlus className="add-project__plus" />
          <span className="add-project__text">Add Project</span>
        </div>
      )}
    </div>
  );
};
