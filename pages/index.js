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
export default ({ songs = [] }) => {
    const theme = useContext(ThemeContext);
    const [songInfo, setSongInfo] = useState(null);
    const [songList, setSongList] = useState([]);
    useEffect(()=>{
        if(songs.length > 0){
            const formattedSongList = songs.map(s=>({...s, isPlaying: false }));
            setSongList(formattedSongList);
        }
    },[songs])
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
    // console.log("songs",songs);
    return (
        <Layout>
            {songs.length > 0 && <SongList onPlaySelected={onPlaySelected} songList = {songList} />}
            {songInfo && <Player songInfo={songInfo} />}
        </Layout>
    );
}