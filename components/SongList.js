import { useEffect, useContext } from "react";
import styles from './songlist.module.scss';
import { VolumeOn } from "./ui";
import { ThemeContext } from "./Layout";

const getImageStyle = (album) => {
    return { backgroundImage: `url(${album.cover_medium})`}
}
export default function SongList({ songList = [], onPlaySelected }){
    const theme = useContext(ThemeContext);
    return (
        <div className={styles.container}>
            <div className={styles.songList}>
                {
                    songList.map((song,i)=>{
                        return (
                            <div key={i} className={styles.song} onClick={()=>onPlaySelected(song)}>
                                <div className={`${styles.songImage} ${song.isPlaying ? styles.playing :''}`} style={getImageStyle(song.album)}>
                                    <div className={styles.playButton}>
                                        {!song.isPlaying && <div className="play-btn" title="Play" ></div>}
                                        {song.isPlaying && <div className="volume-btn"><VolumeOn /> </div>}
                                    </div>
                                </div>
                                <div className={styles.songInfo} style={theme.songInfo}>
                                    <span className={styles.songName} title={song.title_short}>{song.title_short}</span>
                                    <span className={styles.artist}>Artist. {song.artist.name}</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            { songList.length < 1 && <div className={styles.noSongFound}>No Song Found!</div>}
        </div>
    );
}