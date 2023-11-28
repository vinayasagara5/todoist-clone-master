import React from 'react';
import moment from 'moment';

import {
  FaRegPaperPlane,
  FaRegCalendar,
  FaRegCalendarAlt,
} from 'react-icons/fa';

export const TaskDateOverlay = ({
  setTaskDate,
  showTaskdateOverlay,
  setShowTaskdateOverlay,
}) => {
  return (
    showTaskdateOverlay && (
      <div className="task-date" data-testid="task-date-overlay">
        <ul className="task-date__list">
          <li
            data-testid="taskdate-today"
            onClick={() => {
              setTaskDate(moment().format('DD/MM/YYYY'));
              setShowTaskdateOverlay(false);
            }}
          >
            <span>
              <FaRegCalendar />
            </span>
            <span>Today</span>
          </li>
          <li
            data-testid="taskdate-tomorrow"
            onClick={() => {
              setTaskDate(moment().add(1, 'day').format('DD/MM/YYYY'));
              setShowTaskdateOverlay(false);
            }}
          >
            <span>
              <FaRegPaperPlane />
            </span>
            <span>Tomorrow</span>
          </li>
          <li
            data-testid="taskdate-next-week"
            onClick={() => {
              setTaskDate(moment().add(7, 'days').format('DD/MM/YYYY'));
              setShowTaskdateOverlay(false);
            }}
          >
            <span>
              <FaRegCalendarAlt />
            </span>
            <span>Next Week</span>
          </li>
        </ul>
      </div>
    )
  );
};
