import React,{useRef} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlayCircle,faAngleLeft,faAngleRight} from '@fortawesome/free-solid-svg-icons';

const Player=({currentSong}) => {

    const audioRef=useRef(null);

    const playSongHandler=() => {
        console.log(audioRef)
    }

    return (
        <div className="player">
            <div className="time-control">
                <p>Start Time</p>
                <input type="range" />
                <p>End Time</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon className="skip-back" size="3x" color="blue" icon={faAngleLeft} />
                <FontAwesomeIcon onClick={playSongHandler} className="play" size="3x" color="blue" icon={faPlayCircle} />
                <FontAwesomeIcon className="skip-forward" size="3x" color="blue" icon={faAngleRight} />
            </div>
            <audio ref={audioRef} src={currentSong.audio}></audio>
        </div>
    );
};

export default Player;