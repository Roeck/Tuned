import React,{useRef,useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlayCircle,faAngleLeft,faAngleRight,faPause} from '@fortawesome/free-solid-svg-icons';

const Player=({currentSong,isPlaying,setIsPlaying}) => {

    const audioRef=useRef(null);

    const playSongHandler=() => {
        if(isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    }

    const timeUpdateHandler=(e) => {
        const current=e.target.currentTime;
        const duration=e.target.duration;
        setSongInfo({...songInfo,currentTime: current,duration})
    }

    function getTime(time) {
        return (
            Math.floor(time/60)+":"+("0"+Math.floor(time%60)).slice(-2)
        );
    }

    const dragHandler=(e) => {
        audioRef.current.currentTime=e.target.value;
        setSongInfo({...songInfo,currentTime: e.target.value})
    }

    const [songInfo,setSongInfo]=useState({
        currentTime: 0,
        duration: 0,
    })

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input min={0} max={songInfo.duration} value={songInfo.currentTime} onChange={dragHandler} type="range" />
                <p>{getTime(songInfo.duration)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon className="skip-back" size="5x" color="darkBlue" icon={faAngleLeft} />
                <FontAwesomeIcon onClick={playSongHandler} className="play" size="9x" color="darkBlue" icon={faPlayCircle} icon={isPlaying? faPause:faPlayCircle} />
                <FontAwesomeIcon className="skip-forward" size="5x" color="darkBlue" icon={faAngleRight} />
            </div>
            <audio onTimeUpdate={timeUpdateHandler} onLoadedMetadata={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>
        </div>
    );
};

export default Player;