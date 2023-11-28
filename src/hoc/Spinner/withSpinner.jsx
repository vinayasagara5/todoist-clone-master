import React, { useState, useEffect } from 'react';
import { useProjectsValue, useTasksValue } from '../../context';
import { useLocalStorage } from '../../hooks/useLocalStorage/localStorage';
import './withSpinner.scss';

const withSpinner = (WrappedComponent) => {
  const Spinner = ({ ...props }) => {
    const { projectsLoading } = useProjectsValue();
    const { tasksLoading } = useTasksValue();
    const [darkMode] = useLocalStorage('darkmode');

    const [isLoading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    useEffect(() => {
      projectsLoading && setMessage('Loading Projects...');
      tasksLoading && setMessage('Loading Tasks..');
      if (!projectsLoading && !tasksLoading) {
        setLoading(false);
        setMessage('');
      }
    }, [projectsLoading, tasksLoading]);
    return isLoading ? (
      <div
        className={darkMode ? 'loader-container darkMode' : 'loader-container'}
      >
        <svg className="loader" viewBox="0 0 24 24">
          <circle className="loader__value" cx="12" cy="12" r="10" />
          <circle className="loader__value" cx="12" cy="12" r="10" />
          <circle className="loader__value" cx="12" cy="12" r="10" />
          <circle className="loader__value" cx="12" cy="12" r="10" />
          <circle className="loader__value" cx="12" cy="12" r="10" />
          <circle className="loader__value" cx="12" cy="12" r="10" />
        </svg>
        <p>{message}</p>
      </div>
    ) : (
      <WrappedComponent {...props} />
    );
  };
  return Spinner;
};

export default withSpinner;
