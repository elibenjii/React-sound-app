import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/lab/Slider";

const styles = {
  root: {
    display: "flex",
    height: 200,
    padding: "30px 0"
  },
  slider: {
    touchAction: "none",
    padding: "0px 22px"
  }
};

const SliderVolume = ({ classes, onChangeVolume, volume }) => (
  <div className={classes.root}>
    <Slider
      vertical
      classes={{ container: classes.slider }}
      value={volume}
      aria-labelledby="label"
      onChange={onChangeVolume}
      max={1}
    />
  </div>
);

export default withStyles(styles)(SliderVolume);
