import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
  root: {
    
  },
};

const BufferLoader = (props) => {

  const { classes, buffer } = props;
  const progressBar =     
    <div className={classes.root}>
      <LinearProgress variant="buffer" value={buffer} valueBuffer={buffer} />
    </div>
    
  return buffer !== 100 && progressBar 
}

export default withStyles(styles)(BufferLoader);