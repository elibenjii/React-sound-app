import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import History from '@material-ui/icons/History';
import Avatar from '@material-ui/core/Avatar';
import Favorite from '@material-ui/icons/Favorite';
import Grid from '@material-ui/core/Grid';
import AudioSpectrum from 'react-audio-spectrum'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class Tab3 extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      openFavorites: true,
      openRecent: true
    }
  }

  handleClickFavorites = () => this.setState({ openFavorites : !this.state.openFavorites })
  handleClickRecent = () => this.setState({ openRecent : !this.state.openRecent })

  render() {
    const { classes, trackPlayedHistory, changeZik, handleOpenSnackBar, favorites } = this.props;
    const eachRecent = 
      <List component="div" disablePadding>
        {
        localStorage.getItem("Tracks History") === !null ? 
          JSON.parse(localStorage.getItem("Tracks History")).map((x, index)=> 
            <ListItem button className={classes.nested} key={x.id+index} onClick={()=>{changeZik(x); handleOpenSnackBar(true)}}>
              <Avatar alt="Remy Sharp" src={x.avatar} />
              <ListItemText inset primary={x.title} secondary={x.time} />
            </ListItem>
          ) :
          trackPlayedHistory.map((x, index)=> 
            <ListItem button className={classes.nested} key={x.id+index} onClick={()=>{changeZik(x); handleOpenSnackBar(true)}}>
              <Avatar alt="Remy Sharp" src={x.avatar} />
              <ListItemText inset primary={x.title} secondary={x.time} />
            </ListItem>
          ) 
        }
      </List>

      const eachFavorites = 
      <List component="div" disablePadding>
        {
        favorites === !null ? 
          favorites.map((x, index)=> 
            <ListItem button className={classes.nested} key={x.id+index} onClick={()=>{changeZik(x); handleOpenSnackBar(true)}}>
              <Avatar alt="Remy Sharp" src={x.images.square_150} />
              <ListItemText inset primary={x.title}/>
            </ListItem>
          ) :
          favorites.map((x, index)=> 
            <ListItem button className={classes.nested} key={x.id+index} onClick={()=>{changeZik(x); handleOpenSnackBar(true)}}>
              <Avatar alt="Remy Sharp" src={x.images.square_150} />
              <ListItemText inset primary={x.title}/>
            </ListItem>
          ) 
        }
      </List>



    return (
      <div className={classes.root}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <AudioSpectrum
            height={200}
            audioId={'audio-element1'}
            capColor={'#f50057'}
            capHeight={1}
            meterWidth={2}
            width={350}
            meterCount={200}
            meterColor={[
              {stop: 0, color: '#ffffff'},
              {stop: 0.2, color: '#f50057'},
              {stop: 0.4, color: '#3f51b5'},
              {stop: 0.6, color: '#ffffff'},
              {stop: 0.8, color: '#ffffff'},
              {stop: 1, color: '#ffffff'}
            ]}
            gap={1}
          />
        </Grid>
        <List component="nav">
          <ListItem button onClick={this.handleClickFavorites}>
            <ListItemIcon>
              <Favorite />
            </ListItemIcon>
            <ListItemText inset primary="Favorites" />
            {this.state.openFavorites ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.openFavorites} timeout="auto" unmountOnExit>
            {eachFavorites}
          </Collapse>
          <ListItem button onClick={this.handleClickRecent}>
            <ListItemIcon>
              <History />
            </ListItemIcon>
            <ListItemText inset primary="Recently played" />
            {this.state.openRecent ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.openRecent} timeout="auto" unmountOnExit>
            {eachRecent}
          </Collapse>
        </List>
      </div>
    );
  }
}


export default withStyles(styles)(Tab3);