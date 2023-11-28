import React, { useState } from 'react';
import { FaMoon, FaSun, FaPlus, FaBars, FaTimes } from 'react-icons/fa';
import logo from '../../../assets/images/logo.png';
import { AddTask } from '../../Tasks/AddTask/AddTask';

export const Header = ({
  darkMode,
  setDarkMode,
  setShowSidebar,
  showSidebar,
}) => {
  const [showMain, setShowMain] = useState(false);
  const [showQuickAddTask, setShowQuickAddTask] = useState(false);

  const logoText = {
    color: '#fff',
    marginLeft: '10px',
    fontWeight: '500',
  };
  return (
    <header className="header" data-testid="header">
      <nav>
        <div
          className={showSidebar ? 'menu' : 'menu sidebar-closed'}
          data-testid="show-sidebar"
        >
          <div
            data-testid="toggle-sidebar"
            onClick={() => setShowSidebar(!showSidebar)}
            style={{ width: 'max-content' }}
          >
            <span className="mobile-menu">
              {showSidebar ? <FaTimes /> : <FaBars />}
            </span>
            <span className="desktop-menu">
              <FaBars />
            </span>
          </div>
        </div>
        <div className="logo">
          <img src={logo} alt="logo" />
          <p style={logoText}>Todoist Clone</p>
        </div>
        <div className="settings">
          <ul>
            <li className="settings__add">
              <button
                data-testid="quick-add-task-action"
                tabIndex={0}
                onClick={() => {
                  setShowMain(true);
                  setShowQuickAddTask(true);
                }}
                onKeyDown={() => {
                  setShowMain(true);
                  setShowQuickAddTask(true);
                }}
              >
                <FaPlus />
              </button>
            </li>
            <li className="settings__darkmode">
              <button
                data-testid="dark-mode-action"
                tabIndex={0}
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? (
                  <FaSun data-testid="sun-icon" />
                ) : (
                  <FaMoon data-testid="moon-icon" />
                )}
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <AddTask
        showAddTaskMain={false}
        shouldShowMain={showMain}
        showQuickAddTask={showQuickAddTask}
        setShowQuickAddTask={setShowQuickAddTask}
      />
    </header>
  );
};
