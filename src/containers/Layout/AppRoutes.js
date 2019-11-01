import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import loadable from '@loadable/component'

const Dashboard = loadable(() => import('containers/Dashboard'))
const TablePage = loadable(() => import('containers/TablePage'))

function AppRoutes(props) {
  return (
    <Switch>
      <Route path='/app/dashboard' component={Dashboard} />
      <Route path='/app/table' component={TablePage} />
      <Redirect to='/app/dashboard' />
    </Switch>
  );
}

export default AppRoutes;