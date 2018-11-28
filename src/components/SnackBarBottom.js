import React, { Component } from "react";
import Snackbar from "@material-ui/core/Snackbar";

class SnackBarBottom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vertical: "bottom",
      horizontal: "right"
    };
  }

  render() {
    const { openSnackBar, currentMusicTitle, handleOpenSnackBar } = this.props;
    const { vertical, horizontal } = this.state;
    return (
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={openSnackBar}
        onClose={() => handleOpenSnackBar(false)}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        autoHideDuration={2000}
        message={<span id="message-id">Playgin now: {currentMusicTitle}</span>}
      />
    );
  }
}

export default SnackBarBottom;
