import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import DashboardComponent from './modules/Dashboard/DashboardComponent';

import history from './history';
const URLS = {
  DASHBOARD: '/',
  USERS: '/users'
}
class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <Switch>
            <Route
              path={URLS.DASHBOARD}
              exact
              component={DashboardComponent}
            />
          </Switch>
        </ThemeProvider>
      </Router>
    )
  }
}

export default App;
