import { useEffect } from "react";
import styles from './songlist.module.scss';
import { VolumeOn } from "./ui";

const getImageStyle = (album) => {
    return { backgroundImage: `url(${album.cover_medium})`}
}
export default function SongList({ songList = [], onPlaySelected }){
    useEffect(()=>{

        // fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=alec-benjamin", {
        //     "method": "GET",
        //     "headers": {
        //         "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        //         "x-rapidapi-key": "678607cc0amsh199183a745fa718p1838ddjsn7c9ccbda4f93"
        //     }
        // })
        // .then(response => {
        //     console.log("response",response);
        // })
        // .catch(err => {
        //     console.log("err",err);
        // });

    },[])
    // console.log("songList",songList)
    return (
        <div className={styles.container}>
            <div className={styles.songList}>
                {
                    songList.map((song,i)=>{
                        return (
                            <div key={i} className={styles.song}>
                                <div className={`${styles.songImage} ${song.isPlaying ? styles.playing :''}`} style={getImageStyle(song.album)}>
                                    <div className={styles.playButton}>
                                        {!song.isPlaying && <div className="play-btn" title="Play" onClick={()=>onPlaySelected(song)}></div>}
                                        {song.isPlaying && <div className="volume-btn"><VolumeOn /> </div>}
                                    </div>
                                </div>
                                <div className={styles.songInfo}>
                                    <span className={styles.songName}>{song.title}</span>
                                    <span className={styles.artist}>Artist. {song.artist.name}</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}