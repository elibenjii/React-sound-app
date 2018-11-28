import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/lab/Slider";

const styles = {
  root: {
    paddingBottom: "20px",
    width: "100%"
  },
  slider: {
    touchAction: "none"
  }
};

const SliderPosition = ({ classes, onChangePosition, position, duration }) => (
  <div className={classes.root}>
    <Slider
      classes={{ container: classes.slider }}
      value={position}
      aria-labelledby="label"
      onChange={onChangePosition}
      max={duration}
    />
  </div>
);

export default withStyles(styles)(SliderPosition);
