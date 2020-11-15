import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlayCircle,faAngleLeft,faAngleRight} from '@fortawesome/free-solid-svg-icons';

const Player=() => {
    return (
        <div className="player">
            <div className="time-control">
                <p>Start Time</p>
                <input type="range" />
                <p>End Time</p>
            </div>
            <div className="play-control"></div>
            <FontAwesomeIcon className="skip-back" size="3x" color="blue" icon={faAngleLeft} />
            <FontAwesomeIcon className="play" size="3x" color="blue" icon={faPlayCircle} />
            <FontAwesomeIcon className="skip-forward" size="3x" color="blue" icon={faAngleRight} />
        </div>
    );
};

export default Player;