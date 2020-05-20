import Layout from "../components/Layout";
import { useContext, useState, useEffect } from "react";
import { ThemeContext } from '../components/Layout';
import { Player } from "../components/ui";
import SongList from "components/SongList";
import { requestSongs } from "utils";

export async function getStaticProps(){
    const songs = await requestSongs();
    return { props: { songs: songs.data }};
}
const DEBOUNCE_DELAY = 500;
const debounce = (func, delay) => { 
    let debounceTimer; 
    return function() { 
        const context = this;
        const args = arguments; 
            clearTimeout(debounceTimer); 
            debounceTimer = setTimeout(() => func.apply(context, args), delay) 
    } 
}  
export default ({ songs = [] }) => {
    const theme = useContext(ThemeContext);
    const [songInfo, setSongInfo] = useState(null);
    const [songList, setSongList] = useState([]);
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
    const onSearchSongs = debounce(async function(searchText){
        const songs = await requestSongs(searchText);
        loadSongs(songs.data);
    },DEBOUNCE_DELAY)
    return (
        <Layout onSearchSongs={onSearchSongs}>
            <SongList onPlaySelected={onPlaySelected} songList = {songList} />
            {songInfo && <Player songInfo={songInfo} />}
        </Layout>
    );
}