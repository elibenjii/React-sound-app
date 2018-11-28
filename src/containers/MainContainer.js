import React, { Component } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import Router from "../components/Router";
import SnackBarBottom from "../components/SnackBarBottom";
import BottomTrackMenu from "../components/BottomTrackMenu";
import "../assets/bottomTrackMenu..css";
import "../assets/global.css";

const styles = {
  root: {
    maxWidth: window.innerWidth,
    backgroundColor: "rgba(255, 255, 255, 1)",
    zIndex: 99
  },
  container: {},
  card: {
    maxWidth: 345
  },
  media: {
    objectFit: "cover"
  },
  slider: {
    padding: "22px 0px"
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "PAUSED",
      position: 0,
      value: 50,
      volume: 0.8,
      query: "",
      trackData: {
        id: "4r8vz2",
        title: "XYLO - America",
        image_url:
          "https://img.fanburst.com/qdnIJZWEK0tYS4-B9K0A3YE1EtQ=/500x500/cx2.fanburst.com/artwork/1d2af852-c002-47c3-9097-81b41e479153.jpg",
        images: {
          square_150:
            "https://img.fanburst.com/8yhz1tSX18pb5CY45-YG8ZjpBiU=/150x150/cx2.fanburst.com/artwork/1d2af852-c002-47c3-9097-81b41e479153.jpg"
        },
        user: {
          name: "Vasta"
        }
      },
      searchData: [],
      buffer: 0,
      trackPlayedHistory: [],
      favorites: [],
      currentTrackRating: 0,
      openSnackBar: false,
      openSlideTrack: false
    };
    this.audio = "";
  }
  componentDidMount = () => {
    localStorage.getItem("Tracks History") &&
      this.setState({
        trackPlayedHistory: JSON.parse(localStorage.getItem("Tracks History"))
      });
    localStorage.getItem("Favorites") &&
      this.setState({
        trackPlayedHistory: JSON.parse(localStorage.getItem("Favorites"))
      });
    axios
      .all(
        [
          axios.get(
            "https://api.fanburst.com/tracks/" +
              this.state.trackData.id +
              "?client_id=" +
              API_KEY
          ),
          axios.get(
            "https://api.fanburst.com/tracks/search?query=groovy&client_id=" +
              API_KEY
          )
        ],
        { headers: { "Accept-Version": "v1" } }
      )
      .then(
        axios.spread((response1, response2) => {
          this.setState({
            trackData: response1.data,
            searchData: response2.data
          });
          console.log(this.state.searchData);
        })
      )
      .catch(error => {
        console.log(error);
      });
    this.audio = document.getElementById("audio-element1");
    setInterval(() => {
      if (this.audio.buffered.length === 1 && this.state.status === "PLAY") {
        if (this.state.buffer !== 100) {
          this.setState({
            buffer: (this.audio.buffered.end(0) / this.audio.duration) * 100
          });
        }
      }
      this.setState({ position: this.audio.currentTime });
      this.audio.currentTime === this.audio.duration &&
        this.changeZik(
          this.state.searchData[
            this.state.searchData
              .map(x => x.id)
              .indexOf(this.state.trackData.id) + 1
          ]
        );
    }, 300);
  };

  pause = () => {
    this.audio.pause();
    this.setState({
      status: "PAUSED"
    });
  };

  play = () => {
    this.audio.play();
    this.setState({
      status: "PLAY"
    });
  };

  volume = () => {
    this.audio.volume = 0.5;
  };

  position = () => {
    this.audio.currentTime = 60;
  };

  onChangePosition = (e, value) => {
    e.preventDefault();
    this.audio.currentTime = value;
    this.setState({ position: value });
  };

  onChangeVolume = (e, value) => {
    e.preventDefault();
    this.audio.volume = value;
    this.setState({ volume: value });
  };

  onChangeRating = (newRating, name) => {
    this.setState({
      trackRating: newRating
    });
  };

  addToFavorites = x => {
    if (this.state.favorites.length > 0) {
      this.state.favorites.map(y => {
        if (y.id !== x.id) {
          this.setState({ favorites: [...this.state.favorites, x] });
          setTimeout(
            () =>
              localStorage.setItem(
                "Favorites",
                JSON.stringify(this.state.favorites)
              ),
            1000
          );
        } else if (y.id === x.id) {
          this.setState({
            favorites: this.state.favorites.filter(z => z.id !== x.id)
          });
          setTimeout(
            () =>
              localStorage.setItem(
                "Favorites",
                JSON.stringify(this.state.favorites)
              ),
            1000
          );
        }
      });
    } else {
      this.setState({ favorites: [...this.state.favorites, x] });
      setTimeout(
        () =>
          localStorage.setItem(
            "Favorites",
            JSON.stringify(this.state.favorites)
          ),
        1000
      );
    }
  };

  handleChangeBottomNav = (e, menu) => this.setState({ menu });

  handleOpenSnackBar = openSnackBar => this.setState({ openSnackBar });

  handleOpenSlideTrack = close => {
    close === "close"
      ? this.setState({ openSlideTrack: false })
      : this.setState({ openSlideTrack: !this.state.openSlideTrack });
  };

  changeZik = x => {
    axios
      .get("https://api.fanburst.com/tracks/" + x.id + "?client_id=" + API_KEY)
      .then(response => {
        this.setState({
          buffer: 0,
          status: "PAUSED",
          trackData: response.data,
          position: 0,
          typingSearch: false,
          query: "",
          trackPlayedHistory: [
            ...this.state.trackPlayedHistory,
            {
              title: response.data.title,
              id: response.data.id,
              avatar: response.data.images.square_150,
              time: new Date()
                .toLocaleDateString("en-TH", {
                  day: "numeric",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit"
                })
                .toString()
            }
          ]
        });
        this.audio.pause();
        console.log("data", response);
      })
      .then(() => {
        localStorage.setItem(
          "Tracks History",
          JSON.stringify(this.state.trackPlayedHistory)
        );
        this.audio.play();
      })
      .then(() => {
        this.setState({ status: "PLAY" });
      })
      .catch(function(error) {
        console.log("fetch no1 ", error);
      });
  };

  onSearch = e => {
    this.setState({ query: e.target.value });
    axios
      .get(
        "https://api.fanburst.com/tracks/search?query=" +
          this.state.query +
          "&client_id=" +
          API_KEY
      )
      .then(response => {
        this.setState({
          searchData: response.data
        });
        console.log("search", response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  onSearchAuthor = idAuthor => {
    axios
      .get(
        "https://api.fanburst.com/users/" +
          idAuthor +
          "/tracks?client_id=" +
          API_KEY
      )
      .then(response => {
        this.setState({
          searchData: response.data
        });
        console.log("author:", response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const {
      status,
      trackData,
      favorites,
      openSlideTrack,
      openSnackBar,
      position,
      clientId,
      query,
      searchData,
      trackPlayedHistory
    } = this.state;

    return (
      <div>
        <Router
          favorites={favorites}
          trackPlayedHistory={trackPlayedHistory}
          searchData={searchData}
          query={query}
          onSearch={this.onSearch}
          handleOpenSnackBar={this.handleOpenSnackBar}
          changeZik={this.changeZik}
          handleOpenSlideTrack={this.handleOpenSlideTrack}
        />
        <SnackBarBottom
          openSnackBar={openSnackBar}
          currentMusicTitle={trackData.title}
          handleOpenSnackBar={this.handleOpenSnackBar}
        />
        <BottomTrackMenu
          handleChangeBottomNav={this.handleChangeBottomNav}
          onChangePosition={this.onChangePosition}
          position={position}
          duration={this.audio.duration}
          onChangeVolume={this.onChangeVolume}
          volume={this.audio.volume}
          play={this.play}
          pause={this.pause}
          status={status}
          trackData={trackData}
          addToFavorites={this.addToFavorites}
          favorites={favorites}
          onSearchAuthor={this.onSearchAuthor}
          openSlideTrack={openSlideTrack}
          handleOpenSlideTrack={this.handleOpenSlideTrack}
        />
        <audio
          id="audio-element1"
          crossOrigin="anonymous"
          src={
            "https://api.fanburst.com/tracks/" +
            trackData.id +
            "/stream?client_id=" +
            clientId
          }
        />
      </div>
    );
  }
}

export default withStyles(styles)(App);
