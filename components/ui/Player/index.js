import styles from './player.module.scss';
import PropTypes from 'prop-types';
import { useRef, useEffect, useState } from 'react';
import { getTimeProgressMinutes } from 'utils';
export default function Player({songInfo}){
    const [playState, setPlayState] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPreviewUrl, setCurrentPreviewUrl] = useState('');
    const audioRef = useRef();
    const currentTimeRef = useRef();
    const barRef = useRef();
    const pointRef = useRef();
    const progressRef = useRef();
    useEffect(()=>{
        setPlayState(true);
        const audObj = audioRef.current;
        audObj.src = songInfo.preview;
        audObj.play();
    },[songInfo.preview]);
    const onTimeUpdate = function(e) {
        const { duration, currentTime } = e.nativeEvent.srcElement;
        const { currentTimeInMinute, durationInMinute, progress} = getTimeProgressMinutes({ duration, currentTime });
        currentTimeRef.current.innerText = `${currentTimeInMinute} / ${durationInMinute}`;
        barRef.current.style.width = `${progress}%`;
        pointRef.current.style.left = `${progress}%`;
        if(progress === 100){
            setPlayState(false);
        }else if(progress < 100){
            if(currentPreviewUrl !== songInfo.preview){
                setPlayState(true);
                setCurrentPreviewUrl(songInfo.preview);
            }
        }
    }
    const onSetProgress = function(e)  {
        const barWidth = progressRef.current.clientWidth;
        const clickX = e.nativeEvent.offsetX;
        const duration = audioRef.current.duration;
        audioRef.current.currentTime = (clickX/barWidth) * duration;
        // console.log(progressRef.current.clientWidth, e.nativeEvent.offsetX)
    }
    const onTogglePlay = (e) => {
        if(playState){
            audioRef.current.pause();
            setPlayState(false);
        }else{
            audioRef.current.play();
            setPlayState(true);
        }
    }
    const onPreviousTrack = () => {

    }
    const onNextTrack = () => {

    }
    const onLoadedData = (e) => {
        if(audioRef.current.readyState > 2){
            setIsLoading(false);
        }else{
            setIsLoading(true);
        }
    }
    const onCanPlay = (e) => {
        // console.log(e)
        // console.log(e.readyState)
    }
    // console.log("play-state",playState);
    
    return (
        <div className={styles.container}>
            <div className={styles.progressBar} ref={progressRef} onClick={onSetProgress}>
                <div className="progress-bar" title="Seek slider">
                    <div className="bar" ref={barRef}></div>
                    <div className="point" ref={pointRef}></div>
                </div>
            </div>
            <div className={styles.audioControls}>
                <div className={styles.playControls}>
                    <div onClick={onPreviousTrack} className={styles.prevTrack}>
                        <div className="prev-btn" title="Previous song"></div>
                    </div>
                    <div onClick={onTogglePlay} className={styles.playTrack}>
                        {(playState && !isLoading) && <div className="pause-btn" title="Pause"></div>}
                        {(!playState && !isLoading) && <div className="play-btn" title="Play"></div>}
                        {isLoading && <div className="audio-loading"></div>}
                    </div>
                    <div onClick={onNextTrack} className={styles.nextTrack}>
                        <div className="next-btn" title="Next song"></div>
                    </div>
                    <span className={styles.currentTime} ref={currentTimeRef}></span>
                </div>
                <div className={styles.trackInfo}>
                    <div className={styles}><img src={songInfo.album.cover_small} alt="album cover" /></div>
                    <div className={styles.artistInfo}>
                        <span>{songInfo.title}</span>
                        <span>{songInfo.artist.name}</span>
                    </div>
                </div>
                {/* <div className={styles.otherControls}>other controls</div> */}
            </div>
            
            <audio onLoadedData={onLoadedData} onTimeUpdate={onTimeUpdate} className={styles.audio} onCanPlay={onCanPlay}  preload="auto"  ref={audioRef} />
        </div>
    );
}

Player.propTypes = {
    songInfo: PropTypes.object
}