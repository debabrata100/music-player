import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import { Player } from "../components/ui";
import SongList from "components/SongList";
import { requestSongs, debounce } from "utils";

const DEBOUNCE_DELAY = 500;

export async function getStaticProps(){
    const songs = await requestSongs();
    return { props: { songs: songs.data }};
}
export default ({ songs = [] }) => {
    const { songList, songInfo, isSearching, onPlaySelected, onSearchSongs, onPlayPrevSong, onPlayNextSong } = useSearchSongs(songs);
    return (
        <Layout onSearchSongs={onSearchSongs} isSearching={isSearching}>
            <SongList onPlaySelected={onPlaySelected} songList = {songList} />
            {songInfo && <Player 
                onPlayPrevSong = { onPlayPrevSong }  
                onPlayNextSong = { onPlayNextSong } 
                songInfo={songInfo} 
            />}
        </Layout>
    );
}

export function useSearchSongs(songs){
    const [songList, setSongList] = useState([]);
    const [songInfo, setSongInfo] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    useEffect(()=>{
        loadSongs(songs);
     },[songs])
     const loadSongs = songs => {
         if(songs.length > 0){
             const formattedSongList = songs.map(s=>({...s, isPlaying: false }));
             setSongList(formattedSongList);
         }else{
             setSongList([]);
         }
     }
     const onPlaySelected = (song) => {
        const formattedSongList = songList.map(s=>{
            if(song.id === s.id){
                s.isPlaying = true;
            }else{
                s.isPlaying = false;
            }
            return s;
        })
        setSongList(formattedSongList);
        setSongInfo(song)
    }
    const onPlayNextSong = () => {
        const currentSongIndex = songList.findIndex(s=>s.isPlaying === true);
        if(currentSongIndex < songList.length-1){
            onPlaySelected(songList[currentSongIndex+1]);
        }else if(currentSongIndex === songList.length-1){
            onPlaySelected(songList[0]);
        }
    }
    const onPlayPrevSong = () => {
        const currentSongIndex = songList.findIndex(s=>s.isPlaying === true);
        if(currentSongIndex > 0){
            onPlaySelected(songList[currentSongIndex-1]);
        }else if(currentSongIndex === 0){
            onPlaySelected(songList[songList.length-1]);
        }
    }

    const onSearchSongs = debounce(async function(searchText){
        setIsSearching(true);
        const songs = await requestSongs(searchText);
        loadSongs(songs.data);
        setIsSearching(false);
    },DEBOUNCE_DELAY);
    return {
        songList,
        songInfo,
        isSearching,
        onSearchSongs,
        onPlaySelected,
        onPlayNextSong,
        onPlayPrevSong
    }
}