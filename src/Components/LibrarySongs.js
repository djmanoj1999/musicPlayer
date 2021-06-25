import React from "react";

const LibrarySong = ({songs, song , setCurrentSong ,id, audioRef, isPlaying,setSongs}) => {
    const songSelectHandler = async () => {
        await setCurrentSong(song);
        // add active state
        const newSongs = songs.map((song) => {
            if(song.id === id){
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
        }) 
        setSongs(newSongs);
        //playAudio(isPlaying, audioRef);
        if(isPlaying) audioRef.current.play();
      
    }
    return (
        <div tabIndex="0">
        <div className={`library-song ${song.active ? "selected" : ""}`} 
        onClick={songSelectHandler} >   
        <img alt={"image " + song.name} src={song.cover}></img>
        <div className="song-description">
            <h3>{song.name}</h3>
            <h4>{song.artist}</h4>
        </div>
        </div>
        </div>
    );
}

export default LibrarySong;