import React,{useState,useRef} from 'react';
import "./styles/app.scss";
import Player from './components/Player'
import Song from './components/Song'
import Library from './components/Library'
import LibrarySong from './components/LibrarySong'
import data from './data';

function App() {
  const audioRef=useRef(null);
  const [songs,setSongs]=useState(data());
  const [currentSong,setCurrentSong]=useState(songs[0]);
  const [isPlaying,setIsPlaying]=useState(false);

  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player
        audioRef={audioRef}
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        currentSong={currentSong}
        setSongInfo={setSongInfo}
        songInfo={songInfo}
      />
      <Library audioRef={audioRef} songs={songs} setCurrentSong={setCurrentSong} />
      <audio
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
}

export default App;
