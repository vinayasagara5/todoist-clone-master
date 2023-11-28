import React from 'react';
import { firebase } from '../../firebase';
import { FaRegCheckCircle, FaRegCircle } from 'react-icons/fa';

export const Checkbox = ({ id, done }) => {
  const taskStatusToggle = () => {
    firebase.firestore().collection('tasks').doc(id).update({ done: !done });
  };
  return (
    <div className="checkTask" data-testid="checkbox-action">
      {!done ? (
        <FaRegCircle
          onClick={taskStatusToggle}
          data-testid="checkbox-not-done"
        />
      ) : (
        <FaRegCheckCircle
          onClick={taskStatusToggle}
          data-testid="checkbox-done"
        />
      )}
    </div>
  );
};
