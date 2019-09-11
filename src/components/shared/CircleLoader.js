import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  progress: {
   
  },
}));

export default function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <div>
      <CircularProgress className={classes.progress} color="inherit" />
    </div>
  );
}