import React from 'react';
import withSpinner from '../Spinner/withSpinner';

const WithLayout = ({ darkMode, children }) => (
  <main data-testid="application" className={darkMode ? 'darkmode' : undefined}>
    <>{children}</>
  </main>
);

export default withSpinner(WithLayout);
export { WithLayout as PureWithLayout };
