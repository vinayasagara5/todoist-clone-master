import React, { useContext, createContext } from 'react';
import { useTasks } from '../hooks/useTasks/tasks';

export const TaskContext = createContext();

export const TasksProvider = ({ children }) => {
  const { tasks, setTasks, tasksLoading } = useTasks();
  return (
    <TaskContext.Provider value={{ tasks, setTasks, tasksLoading }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasksValue = () => useContext(TaskContext);
