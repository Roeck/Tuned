import React,{useState,useRef} from 'react';
import "./styles/app.scss";
import Player from './components/Player'
import Song from './components/Song'
import Library from './components/Library'
import LibrarySong from './components/LibrarySong'
import Nav from './components/Nav'
import chillHop from './data';
import {playAudio} from './util';

function App() {
  //Ref
  const audioRef=useRef(null);

  const [songs,setSongs]=useState(chillHop());
  const [currentSong,setCurrentSong]=useState(songs[0]);
  const [isPlaying,setIsPlaying]=useState(false);
  const [songInfo,setSongInfo]=useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
    volume: 0,
  });

  const [libraryStatus,setLibraryStatus]=useState(false);

  const timeUpdateHandler=(e) => {
    const current=e.target.currentTime;
    const duration=e.target.duration;

    const roundedCurrent=Math.round(current);
    const roundedDuration=Math.round(duration);
    const percentage=Math.round((roundedCurrent/roundedDuration)*100);
    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration: duration,
      animationPercentage: percentage,
      volume: e.target.volume,
    });
  };
  const songEndHandler=async () => {
    let currentIndex=songs.findIndex((song) => song.id===currentSong.id);
    await setCurrentSong(songs[(currentIndex+1)%songs.length]);
    playAudio(isPlaying,audioRef);
    return;
  };

  return (
    <div className="App">
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        audioRef={audioRef}
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        currentSong={currentSong}
        setSongInfo={setSongInfo}
        songInfo={songInfo}
      />
      <Library audioRef={audioRef} songs={songs} setCurrentSong={setCurrentSong} isPlaying={isPlaying} setSongs={setSongs} libraryStatus={libraryStatus} />
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
