import React from "react";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Fade from "@material-ui/core/Fade";

import logo from "assets/images/logo.png";
import useStyles from './styles';
import appInfo from 'assets/config'

const getDayDuration = date => {
  const hours = date ? date.getHours() : (new Date()).getHours();
  if (hours >= 5 && hours < 13) {
    return 'Morning';
  } else if(hours >= 13 && hours < 18) {
    return 'Afternoon';
  } else {
    return 'Evening'
  }
}

export default function LoginView (props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container className={classes.container}>
        <Grid item lg={5} className={classes.logotypeContainer}>
          <div className={classes.logotype}>
            <div className={classes.logotypeInner}>
              <img src={logo} alt="logo" className={classes.logotypeImage} />
              <Typography variant="h4" className={classes.logotypeText}>
                {appInfo.appName}
              </Typography>
            </div>
          </div>
        </Grid>
        <Grid item lg={7} xs={12} className={classes.content}>
          <div className={classes.content}>
            <div className={classes.contentHeader}>
            </div>
            <div className={classes.contentBody}>
              <form className={classes.form}>
                <Typography variant="h4" className={classes.title}>
                  {`Good ${getDayDuration()}`}
                </Typography>
                <Typography variant="body1" className={classes.subtitle}>
                  {`Welcome!`}
                </Typography>
                <Fade in={props.error}>
                  <Typography color="secondary" className={classes.submitError}>
                    Something is wrong with your login or password :(
                  </Typography>
                </Fade>
                <div className={classes.fields}>
                  <TextField
                    id="user"
                    name="user"
                    label="用户名"
                    value={props.userValue}
                    onChange={e => props.handleInput(e, "user")}
                    fullWidth
                    required
                    margin="normal"
                    variant="outlined"
                    autoFocus
                    placeholder='admin'
                  />
                  <TextField
                    id="password"
                    name="password"
                    label="密码"
                    type="password"
                    value={props.passwordValue}
                    onChange={e => props.handleInput(e, "password")}
                    fullWidth
                    required
                    margin="normal"
                    variant="outlined"
                    autoFocus
                    placeholder='888888'
                  />
                </div>
                {props.isLoading ? (
                  <CircularProgress className={classes.progress} />
                ) : (
                  <Button
                    className={classes.signIn}
                    disabled={
                      props.error
                      || props.userValue.length === 0
                      || props.passwordValue.length === 0
                    }
                    onClick={props.handleLoginButtonClick}
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                  >
                    登录
                  </Button>
                )}
              </form>
            </div>
            <div className={classes.contentFooter}>
              <Typography color="textSecondary" variant='body2' className={classes.copyright}>
                {appInfo.copyright}
              </Typography>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};