import React from 'react';
import { Tasks } from '../../Tasks/Tasks';
import { Sidebar } from '../Sidebar/Sidebar';

export const Content = ({ showSidebar, setShowSidebar }) => {
  return (
    <div
      className={showSidebar ? 'content' : 'content sidebar--closed'}
      data-testid="content"
    >
      {showSidebar && (
        <div
          className="mobile-overlay"
          data-testid="sidebar-overlay"
          onClick={() => {
            setShowSidebar(!showSidebar);
          }}
        ></div>
      )}
      <Sidebar />
      <Tasks />
    </div>
  );
};
