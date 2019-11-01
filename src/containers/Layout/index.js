import React from 'react';
import { compose } from "recompose";
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import TableChartIcon from '@material-ui/icons/TableChart';

import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import { signOut } from 'containers/Login/loginState';
import AppRoutes from './AppRoutes';
import RouterBreadcrumbs from './RouterBreadcrumbs';

const structure = [
  { id: 0, label: 'Dashboard', link: '/app/dashboard', icon: <HomeIcon /> },
  { id: 1, label: 'Table', link: '/app/table', icon: <TableChartIcon /> },
];

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  layout: {
    padding: theme.spacing(1, 2),
  },
}));

function Layout(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className={classes.root}>
      <Header
        open={open}
        setOpen={setOpen}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        signOut={props.signOut}
      />
      <Sidebar
        open={open}
        setOpen={setOpen}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        menu={structure}
      />

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className={classes.layout}>
          <RouterBreadcrumbs />
          <AppRoutes />
        </div>
      </main>
    </div>
  );
}

export default compose(
  connect(
    state => ({}),
    { signOut }
  ),
)(Layout);