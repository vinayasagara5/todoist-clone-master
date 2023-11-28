import moment from 'moment';
import { firebase } from '../../firebase';
import { useState, useEffect } from 'react';
//all tasks merged into one
import { collatedTasksExist } from '../../helpers';

export const useTasks = (selectedProject) => {
  const [tasks, setTasks] = useState([]);
  const [tasksLoading, setTasksLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = firebase
      .firestore()
      .collection('tasks')
      .where('userId', '==', 'chtjuMWL3bEWyMN');

    // unsubscribe =
    //   selectedProject && !collatedTasksExist(selectedProject)
    //     ? (unsubscribe = unsubscribe.where('projectId', '==', selectedProject))
    //     : selectedProject === 'TODAY'
    //     ? (unsubscribe = unsubscribe.where(
    //         'date',
    //         '==',
    //         moment().format('DD/MM/YYYY')
    //       ))
    //     : selectedProject === 'INBOX' || selectedProject === 0
    //     ? (unsubscribe = unsubscribe.where('date', '==', ''))
    //     : unsubscribe;

    //if selected project does not exist in collatedTasks

    if (selectedProject && !collatedTasksExist(selectedProject)) {
      unsubscribe = unsubscribe.where('projectId', '==', selectedProject);
    } else if (selectedProject === 'TODAY') {
      unsubscribe = unsubscribe.where(
        'date',
        '==',
        moment().format('DD/MM/YYYY')
      );
    } else if (selectedProject === 'INBOX' || selectedProject === 0) {
      unsubscribe = unsubscribe.where('date', '==', '');
      // console.log(
      //   "selectedProject === INBOX || selectedProject === 0 =>>>>",
      //   unsubscribe
      // );
    }

    unsubscribe = unsubscribe.onSnapshot((snapshot) => {
      const newTasks = snapshot.docs.map((task) => ({
        id: task.id,
        ...task.data(),
      }));

      setTasks(
        selectedProject === 'NEXT_7_DAYS'
          ? newTasks.filter(
              (task) =>
                moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7
            )
          : newTasks
      );
      setTasksLoading(false);
    });

    return () => unsubscribe();
  }, [selectedProject]);

  return { tasks, tasksLoading };
};
