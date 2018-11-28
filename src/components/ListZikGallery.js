import React from "react";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import SearchBar from "./SearchBar";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    marginTop: "15px"
  },
  gridList: {
    width: 500,
    height: "100%"
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  }
});

const ListZikGallery = ({
  classes,
  searchData,
  query,
  onSearch,
  changeZik,
  handleOpenSnackBar
}) => {
  return (
    <div>
      <SearchBar
        query={query}
        onSearch={onSearch}
        style={{
          marginLeft: "0 auto",
          maxWidth: 800,
          zIndex: 99
        }}
      />
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          {searchData !== undefined &&
            searchData.map(x => (
              <GridListTile
                key={x.id}
                onClick={() => {
                  changeZik(x);
                  handleOpenSnackBar(true);
                }}
              >
                <img src={x.images.square_150} alt={x.title} />
                <GridListTileBar
                  title={x.title}
                  subtitle={<span>by: {x.user.name}</span>}
                />
              </GridListTile>
            ))}
        </GridList>
      </div>
    </div>
  );
};

export default withStyles(styles)(ListZikGallery);
