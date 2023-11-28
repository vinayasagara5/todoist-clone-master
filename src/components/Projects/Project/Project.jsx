import React, { useEffect, useState, useRef, useCallback } from 'react';
import { firebase } from '../../../firebase';
import { useProjectsValue, useSelectedProjectValue } from '../../../context';
import { FaPencilAlt, FaArchive, FaTrash } from 'react-icons/fa';
import { MdMoreHoriz } from 'react-icons/md';

export const Project = ({ project, setActive }) => {
  const { projects, setProjects } = useProjectsValue();
  const { setSelectedProject } = useSelectedProjectValue();
  const [isOpen, setIsOpen] = useState(false);

  const drop = useRef(null);

  const deleteProject = (docId) => {
    firebase
      .firestore()
      .collection('projects')
      .doc(docId)
      .delete()
      .then(() => {
        setActive('inbox');
        setSelectedProject('INBOX');
        setProjects([...projects]);
      });
  };

  const archiveProjectToggle = (docId) => {
    firebase
      .firestore()
      .collection('projects')
      .doc(docId)
      .update({ archived: !project.archived })
      .then(() => {
        setActive('inbox');
        setSelectedProject('INBOX');
        setProjects([...projects]);
      });
  };

  const clickAction = (type) => {
    setIsOpen(!isOpen);
    type === 'deleteProject' && deleteProject(project.docId);
    // type === 'renameProject' && renameProject(project.docID);
    type === 'archiveProject' && archiveProjectToggle(project.docId);
  };

  const handleOutsideClick = useCallback(
    (e) => {
      if (!e.target.closest(`.${drop?.current?.className}`) && isOpen) {
        setIsOpen(false);
        document.removeEventListener('click', handleOutsideClick, false);
      }
    },
    [isOpen]
  );

  const handleKeyUp = useCallback((e) => {
    const keys = {
      27: () => {
        e.preventDefault();
        setIsOpen(false);
        window.removeEventListener('keyup', handleKeyUp, false);
      },
    };

    if (keys[e.keyCode]) {
      keys[e.keyCode]();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp, false);
    document.addEventListener('click', handleOutsideClick, false);

    return () => {
      window.removeEventListener('keyup', handleKeyUp, false);
      document.removeEventListener('click', handleOutsideClick, false);
    };
  }, [handleOutsideClick, handleKeyUp]);

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
  return (
    <>
      <div
        data-testid="project-single"
        className="sidebar__project-single"
        onKeyDown={() => {
          setActive(project.projectId);
          setSelectedProject(project.projectId);
        }}
        onClick={() => {
          setActive(project.projectId);
          setSelectedProject(project.projectId);
        }}
        tabIndex={0}
      >
        <span className="sidebar__dot">&bull;</span>
        <span className="sidebar__project-name">{project.name}</span>
        {/* <Dropdown
          customClass="sidebar__project-menu"
          select={<MdMoreHoriz />}
          options={menuValues}
          align="left"
          clickHandler={(action) => {
            clickAction(action.type);
          }}
        /> */}
        <span
          className="sidebar__project-menu"
          data-testid="project-actions"
          onClick={clickAction}
          onKeyDown={clickAction}
        >
          <MdMoreHoriz />
        </span>
      </div>
      {isOpen ? (
        <div
          className="sidebar__project-actions"
          data-testid="project-actions-container"
          ref={drop}
        >
          {menuValues.map((item) => (
            <span
              key={item.type}
              data-testid={item.type}
              data-tooltip={
                item?.name === 'Archive Project' && project?.archived
                  ? (item.name = 'Unarchive Project')
                  : item.name
              }
              title={item.name}
              onClick={() => clickAction(item.type)}
            >
              {item.icon}
            </span>
          ))}
        </div>
      ) : (
        ''
      )}
    </>
  );
};
