import React, { useState } from 'react';
import moment from 'moment';
import { FaPlus } from 'react-icons/fa';
import { useSelectedProjectValue, useProjectsValue } from '../../../context';
import { firebase } from '../../../firebase';
import { FaRegCalendarAlt, FaRegListAlt, FaTimes } from 'react-icons/fa';
import { TaskDateOverlay } from '../../Projects/TaskDateOverlay/TaskDateOverlay';
import { Dropdown } from '../../../ui/Dropdown/Dropdown';

export const AddTask = ({
  showAddTaskMain = true,
  shouldShowMain = false,
  showQuickAddTask,
  setShowQuickAddTask,
}) => {
  const [task, setTask] = useState('');
  const [taskdate, setTaskDate] = useState('');
  const [project, setProject] = useState('');
  const [showMain, setShowMain] = useState(shouldShowMain);
  const [showTaskdateOverlay, setShowTaskdateOverlay] = useState(false);

  const { selectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  const addTask = () => {
    let collatedDate = '';
    const projectId = project || selectedProject;
    if (projectId === 'TODAY') {
      collatedDate = moment().format('DD/MM/YYYY');
    } else if (projectId === 'NEXT_7_DAYS') {
      collatedDate = moment().add(7, 'days').format('DD/MM/YYYY');
    }
    return (
      task &&
      projectId &&
      firebase
        .firestore()
        .collection('tasks')
        .add({
          done: false,
          date: collatedDate || taskdate,
          projectId,
          task,
          userId: 'chtjuMWL3bEWyMN',
        })
        .then(function (docRef) {
          //console.log("Document written with ID: ", docRef.id);
          setTask('');
        })
        .catch(function (error) {
          console.error('Error adding document: ', error);
        })
    );
  };

  return (
    <div
      className={
        showQuickAddTask ? 'add-task-container__overlay' : 'add-task-container'
      }
    >
      <div
        className={showQuickAddTask ? 'task-overlay' : undefined}
        data-testid="add-task-comp"
        onClick={() => {
          showQuickAddTask && setShowMain(false);
          setShowQuickAddTask(false);

          // if (showQuickAddTask) {
          // }
        }}
      ></div>
      {showAddTaskMain && !showMain && (
        <div
          className="add-task__shallow"
          data-testid="show-main-add-task"
          onClick={() => setShowMain(!showMain)}
        >
          <FaPlus className="add-task__plus" />
          <span className="add-task__text">Add Task</span>
        </div>
      )}
      {(showMain || showQuickAddTask) && (
        <div
          className={showQuickAddTask ? 'add-task__overlay' : 'add-task__main'}
          data-testid="add-task"
        >
          {showQuickAddTask && (
            <>
              <div data-testid="quick-add-task" className="add-task__header">
                <h3>Quick Add Task</h3>
                <span className="add-task__cancel-x">
                  <button
                    data-testid="add-task-quick-cancel"
                    tabIndex={0}
                    onClick={() => {
                      setShowMain(false);
                      setShowQuickAddTask(false);
                    }}
                  >
                    <FaTimes />
                  </button>
                </span>
              </div>
            </>
          )}
          <TaskDateOverlay
            setTaskDate={setTaskDate}
            showTaskdateOverlay={showTaskdateOverlay}
            setShowTaskdateOverlay={setShowTaskdateOverlay}
          />
          <input
            className="add-task__content"
            data-testid="add-task-content"
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <div className="add-task__actions">
            <div>
              <button
                type="button"
                className="add-task__submit"
                data-testid="add-task-button"
                onClick={() =>
                  showQuickAddTask
                    ? addTask() &&
                      setShowQuickAddTask(false) &&
                      setShowMain(false)
                    : addTask() && setShowMain(false)
                }
                disabled={!task}
              >
                Add Task
              </button>
              {!showQuickAddTask && (
                <span
                  className="add-task__cancel"
                  data-testid="add-task-main-cancel"
                  onClick={() => {
                    setShowMain(false);
                    setShowTaskdateOverlay(false);
                  }}
                >
                  Cancel
                </span>
              )}
            </div>

            <div className="add-task__details">
              <Dropdown
                customClass="add-task__project"
                select={<FaRegListAlt />}
                options={projects}
                clickHandler={(project) => {
                  setProject(project.projectId);
                }}
              />
              <span
                className="add-task__date"
                data-testid="add-task__date"
                onClick={() => setShowTaskdateOverlay(!showTaskdateOverlay)}
              >
                <FaRegCalendarAlt />
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
