import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from 'notistack';

import theme from '../theme';
import Routes from '../Routes';
import Snackbar from 'components/Snackbar';

export const App = ({
  message,
  variant,
  date,
}) => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
    <SnackbarProvider maxSnack={3} preventDuplicate={false}>
      <Snackbar message={message} variant={variant} date={date} />
    </SnackbarProvider>
  </ThemeProvider>
);

export default compose(
  connect(
    state => ({
      isAuthenticated: state.getIn(['login', 'isAuthenticated']),
      message: state.getIn(['common', 'message']),
      variant: state.getIn(['common', 'variant']),
      date: state.getIn(['common', 'date']),
    }),
  )
)(App);
