import React from 'react';
import SliderPosition from './SliderPosition';
import SliderVolume from './SliderVolume';
import Button from '@material-ui/core/Button';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Grid from '@material-ui/core/Grid';
import Play from '@material-ui/icons/PlayCircleFilled';
import Pause from '@material-ui/icons/PauseCircleOutline';
import Favorite from '@material-ui/icons/Favorite';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import IconButton from '@material-ui/core/IconButton';

const BottomTrackMenu = ({
  onChangePosition,
  position,
  duration,
  onChangeVolume,
  volume,
  play,
  pause,
  status,
  trackData,
  addToFavorites,
  favorites,
  onSearchAuthor,
  openSlideTrack,
  handleOpenSlideTrack
}) => {

  const minutes = position > 0 && Math.floor((position) / 59);
  const seconds = position > 0 && Math.round((position) % 59)
  const minutesLeft = position > 0 && Math.floor((duration-position) / 59);
  const secondsLeft = position > 0 && Math.round((duration-position) % 59)

  return(
    <div className={!openSlideTrack ? 'bottomNav' : 'bottomNavOpen'}>
      <div style={{paddingLeft: '8px', paddingRight: '8px', backgroundColor: 'white'}}>
        <Button size="small" onClick={handleOpenSlideTrack}>
          <KeyboardArrowDown className={openSlideTrack && 'rotateIcon'}/>
        </Button>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="flex-start"
        >
          <Grid item xs={2}>
            <Grid container direction="column" alignItems="flex-start" justify="space-between">
              <Button variant="fab" mini color="secondary" aria-label="Add" onClick={status === 'PAUSED' ? play : pause}>
                {status === 'PAUSED' ? <Play /> : <Pause />}
              </Button>
              <SliderVolume 
                onChangeVolume={onChangeVolume}
                volume={volume}
              />
            </Grid>
          </Grid>
          <Grid item xs={10}>
            <SliderPosition 
              onChangePosition={onChangePosition}
              position={position}
              duration={duration}
            />
            <Grid container direction="row" justify="space-between" alignItems="center" onClick={handleOpenSlideTrack}>
              <div style={{color: 'grey', fontSize:'12px', marginBottom:'10px'}}>{minutes.toString().length === 1 && '0'}{minutes} : {seconds.toString().length === 1 && '0'}{seconds}</div>
              <div style={{color: 'grey', fontSize:'15px', marginBottom:'10px'}}>{trackData.title.length > 15 ? trackData.title.substring(0, 15)+'...' : trackData.title }</div>
              <div style={{color: 'grey', fontSize:'12px', marginBottom:'10px'}}>- {minutesLeft.toString().length === 1 && '0'}{minutesLeft} : {secondsLeft.toString().length === 1 && '0'}{secondsLeft}</div>
            </Grid>
            <div style={{paddingTop: '5px', position: 'relative'}}>
              <img src={trackData.images.square_250} />
              <div className='FavoriteIcon'>
                <IconButton size="large" color="secondary" onClick={()=>addToFavorites(trackData)}> 
                  <Favorite color="secondary" style={{width: 50, height: 50}}  /> 
                </IconButton>
                { favorites.map(x=>x.id === trackData.id && <div style={{position: 'absolute', bottom:-14, left: 6}}>
                <Chip
                  label="Saved"
                  color="secondary"
                  deleteIcon={<DoneIcon />}
                />
              </div>)}
              </div>
            </div>
            <b>{trackData.title}</b>
          </Grid>
        </Grid>
        <Grid style={{cursor: 'pointer', paddingTop: '15px'}} container direction="row" justify="center" alignItems="flex-start" onClick={()=>{onSearchAuthor(trackData.user.id); handleOpenSlideTrack()}}>
          <Grid item xs={3}>
            <img src={trackData.user.avatar_url} style={{width: '70px'}}/>
          </Grid>
          <Grid item xs={7}>
            <p style={{paddingTop: '5px', color: 'grey', fontSize: '15px'}}>Author:   {trackData.user.name}</p>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}


export default BottomTrackMenu;