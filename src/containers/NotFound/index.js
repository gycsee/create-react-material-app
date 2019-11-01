import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { Grid, Typography, Link } from '@material-ui/core';

// Component styles
const styles = theme => ({
  root: {
    height: '100vh'
  },
  content: {
    textAlign: 'center',
    padding: theme.spacing(4)
  },
  image: {
    display: 'inline-block',
    marginTop: '50px',
    maxWidth: '100%',
    width: '554px'
  }
});

class NotFound extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid
        container
        justify='center'
        alignItems='center'
        className={classes.root}
      >
        <Grid item>
          <div className={classes.content}>
            <Typography variant="h4">
              404: The page you are looking for isn’t here
            </Typography>
            <Typography variant="subtitle2">
              You either tried some shady route or you came here by mistake.
              &nbsp;<Link href='/app/dashboard' variant="subtitle2">Back to Home</Link>
            </Typography>
            <img
              alt="Under development"
              className={classes.image}
              src="/images/not_found.png"
            />
          </div>
        </Grid>
      </Grid>
    );
  }
}

NotFound.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NotFound);
