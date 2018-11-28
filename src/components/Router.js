import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import ListZikGallery from "./ListZikGallery";
import HistoryFavorites from "./HistoryFavorites";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";

const TabContainer = ({ children, dir }) => {
  return (
    <Typography
      component="div"
      dir={dir}
      style={{ height: document.documentElement.clientHeight - 100 }}
    >
      {children}
    </Typography>
  );
};

const styles = theme => ({
  root: {
    backgroundColor: "white",
    border: "none",
    boxShadow: "0px 0px 0px 0px rgba(0,0,0,0.75)"
  }
});

class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const {
      classes,
      theme,
      onSearch,
      query,
      searchData,
      changeZik,
      trackPlayedHistory,
      handleOpenSnackBar,
      favorites
    } = this.props;

    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="sticky" color="default" className={classes.root}>
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="Library" />
            <Tab
              icon={
                value === 1 ? (
                  <Favorite color="secondary" />
                ) : (
                  <FavoriteBorder color="secondary" />
                )
              }
            />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <ListZikGallery
              searchData={searchData}
              onSearch={onSearch}
              query={query}
              changeZik={changeZik}
              handleOpenSnackBar={handleOpenSnackBar}
            />
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <HistoryFavorites
              trackPlayedHistory={trackPlayedHistory}
              changeZik={changeZik}
              handleOpenSnackBar={handleOpenSnackBar}
              favorites={favorites}
            />
          </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Router);
