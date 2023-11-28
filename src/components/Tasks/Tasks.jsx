import React, { useEffect } from 'react';
import { firebase } from '../../firebase';
import { FaTrash } from 'react-icons/fa';
import { collatedTasks } from '../../constants';
import { useProjectsValue, useSelectedProjectValue } from '../../context';
import { collatedTasksExist, getCollatedTitle, getTitle } from '../../helpers';
import { useTasks } from '../../hooks/useTasks/tasks';
import { Checkbox } from '../Checkbox/Checkbox';
import { AddTask } from './AddTask/AddTask';

export const Tasks = () => {
  //get all the projects
  const { projects } = useProjectsValue();
  //get selected Project Id
  const { selectedProject } = useSelectedProjectValue();
  const { tasks } = useTasks(selectedProject);
  let projectName = '';

  const deleteTasks = (docId) => {
    firebase.firestore().collection('tasks').doc(docId).delete();
  };

  //if projects does not exist in INBOX NEXT7DAYS or TODAY
  if (projects && selectedProject && !collatedTasksExist(selectedProject)) {
    projectName = getTitle(projects, selectedProject)?.name;
    //    console.log('collatedTasksExist!==', projectName);
  }

  //if projects exist in INBOX NEXT7DAYS or TODAY
  if (selectedProject && collatedTasksExist(selectedProject)) {
    projectName = getCollatedTitle(collatedTasks, selectedProject).value;
    //    console.log('collatedTasksExist===', projectName);
  }

  useEffect(() => {
    document.title = `${projectName}: Todoist`;
  });

  return (
    <div
      className={tasks.length !== 0 ? 'tasks' : 'tasks tasks--empty'}
      data-testid="tasks"
    >
      <section style={{ margin: '0 auto', maxWidth: ' 800px' }}>
        <h2 data-testid="project-name">{projectName}</h2>
        <ul className="tasks__list">
          {tasks.map(({ id, task, done }) => (
            <li key={id}>
              <Checkbox id={id} task={task} done={done} />
              <span
                data-testid="task-name"
                className={done ? 'done' : undefined}
              >
                {task}
              </span>
              <span
                className="delete"
                data-testid="delete-task"
                onClick={() => deleteTasks(id)}
              >
                <FaTrash />
              </span>
            </li>
          ))}
        </ul>
        <AddTask />
      </section>
    </div>
  );
};
