import React, {useState, useRef} from 'react';
//Import Styles
import './styles/app.scss';

//Adding Components
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import Nav from './components/nav';
//Import Util
import data from "./util";


function App() {
  //Ref
  const audioRef = useRef(null);
  //State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[1]);
  const [isPlaying, setIsPlaying] = useState(false);
      //State
      const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
    })
    const timeUpdateHandler = (e) => {
      const current = e.target.currentTime;
      const duration = e.target.duration;
      setSongInfo({...songInfo, currentTime: current, duration: duration})
  }

  return (
    <div className="App">
      <Nav></Nav>
      <Song currentSong={currentSong}/>
      <Player 
      timeUpdateHandler={timeUpdateHandler}
      setSongInfo={setSongInfo}
      songInfo={songInfo}
        audioRef={audioRef}
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying} 
        currentSong={currentSong} 
      />
      <Library 
        songs={songs} 
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
      /><audio 
        onTimeUpdate={timeUpdateHandler} 
        onLoadedMetadata={timeUpdateHandler} 
        ref={audioRef} 
        src={currentSong.audio}
      ></audio>
    </div>
  );
}

export default App;
