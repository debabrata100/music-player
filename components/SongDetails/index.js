import styles from './song-details.module.scss';
import { VolumeOn } from 'components/ui';
export default ({ songInfo, songList, onPlaySelected }) => {
    return (
        <div className={styles.container}>
            <div className={styles.albumArt}>
                <img className={styles.desktopImage} src={songInfo.album.cover_xl} alt="Ablum Cover" />
            </div>
            <div className={styles.songQueue}>
                <label>Queue</label>
                <div className={styles.queueContainer}>
                {
                    songList.map((song,i)=>{
                        return (
                            <div key={i} className={styles.song} title="Click to play" onClick={() => onPlaySelected(song)}>
                                <div className={styles.albumCover}>
                                    <img className={song.isPlaying ? styles.playing : ''} src={song.album.cover_small} alt="small cover"/>
                                    {song.isPlaying && <div className={styles.volumeIcon}><VolumeOn /> </div>}
                                </div>
                                <div className={styles.songInfo}>
                                    <span className={styles.title}>{song.title}</span>
                                    <span className={styles.artistName}>{songInfo.artist.name}</span>
                                </div>
                            </div>
                        );
                    })
                }
                </div>
            </div>
        </div>
    );
}