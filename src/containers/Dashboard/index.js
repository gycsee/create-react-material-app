import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';

const data = [
  {
    title: 'This is a sheet of paper.',
    description: 'Paper can be used to build surface or other elements for your application.'
  }, {
    title: 'This is a sheet of paper.',
    description: 'Paper can be used to build surface or other elements for your application.'
  }, {
    title: 'This is a sheet of paper.',
    description: 'Paper can be used to build surface or other elements for your application.'
  }, {
    title: 'This is a sheet of paper.',
    description: 'Paper can be used to build surface or other elements for your application.'
  }, {
    title: 'This is a sheet of paper.',
    description: 'Paper can be used to build surface or other elements for your application.'
  }, {
    title: 'This is a sheet of paper.',
    description: 'Paper can be used to build surface or other elements for your application.'
  }
]

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3, 2),
  },
}));

function Dashboard() {
  const classes = useStyles();
  return (
    <Grid container spacing={1}>
      {data.map((item, key) => (
        <Grid key={key} item xs={12} sm={12} md={6} lg={6} xl={4}>
          <Paper className={classes.paper}>
            <Typography variant="h5" component="h3">
              {item.title}
            </Typography>
            <Typography component="p">
              {item.description}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  )
}

export default Dashboard