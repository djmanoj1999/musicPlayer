import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay ,faAngleLeft , faAngleRight ,faPause} from '@fortawesome/free-solid-svg-icons';

const Player = ({currentSong,songs ,setSongs, isPlaying ,setIsPlaying, audioRef, songInfo, setSongInfo , setCurrentSong}) => {
  
    const getTime = (time) => {
        return (
            Math.floor(time/60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        );
    };
    //Event handlers
    const playSongHandler = () => {
        audioRef.current.play();
        if(isPlaying){
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        }
        else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    }
    const dragHandler= (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo,currentTime:e.target.value})
    }

    const activeLibraryHandler = (nextPrev) => {
        const newSongs = songs.map((song) => {
            if(song.id === nextPrev.id){
                return {
                    ...song,
                    active: true,
                };
            }
            else{
                return {
                    ...song,
                    active: false
                };
            }
        }) ;
        setSongs(newSongs);
    }
    const skipTrackHandler = async (direction) => {
        let totalSongs = songs.length ;
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if(direction === 'skip-fordward'){
            await setCurrentSong(songs[(currentIndex + 1) % totalSongs ]);
            activeLibraryHandler(songs[(currentIndex + 1) % totalSongs ]);
        }

        if(direction === 'skip-back'){
            if((currentIndex -1) % totalSongs === -1){
                await setCurrentSong(songs[totalSongs - 1]);
                activeLibraryHandler(songs[(currentIndex - 1) % totalSongs ]);
                if(isPlaying) audioRef.current.play();
                return;
            }
            await setCurrentSong(songs[Math.abs((currentIndex - 1)) % totalSongs ])
            activeLibraryHandler(songs[(currentIndex - 1) % totalSongs ]);
        }
        if(isPlaying) audioRef.current.play();
    };
// add the styles
    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    };

    return (
        <div className="player">   
            <div className="time-control">
                <p>{songInfo.duration ? getTime(songInfo.currentTime) : '0:00'}</p>
                <div style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}} className="track">
                    <input 
                    min={0} 
                    max={songInfo.duration || 0}
                    onChange={dragHandler}
                    value={songInfo.currentTime} type="range"/>
                        <div style={trackAnim} className="animate-track">
                        </div>
                    </div>
                    
                <p>{getTime(songInfo.duration)}</p>
            </div>

       <div className="play-control">
                <FontAwesomeIcon 
                className="skip-back"  
                size="2x" 
                onClick={() => skipTrackHandler('skip-back')}
                tabIndex="0" 
                icon={faAngleLeft}/>   

                <FontAwesomeIcon 
                onClick={playSongHandler}
                className="play" 
                size="2x" tabIndex="0"
                icon={isPlaying ? faPause : faPlay}/>

                <FontAwesomeIcon 
                className="skip-fordward"  
                onClick={() => skipTrackHandler('skip-fordward')}
                size="2x" tabIndex="0" 
                icon={faAngleRight}/>
            </div>
        </div>
    );
}

export default Player;