export function getTimeProgressMinutes({ duration, currentTime}){ 
    const progress = (duration+'') === 'NaN' ? 0 : ((currentTime/duration)*100).toFixed(4);
    const durationInMinute = (duration+'') === 'NaN' ? 0 : (duration/60).toFixed(2);
    const currentTimeInMinute = (duration+'') === 'NaN' ? 0 : (currentTime/60).toFixed(2);
    return {
        currentTimeInMinute,
        durationInMinute,
        progress: progress < 100 ? progress : 100
    }
}
const DEFALUT_ARTIST = 'alec-benjamin';
export async function requestSongs(searchText = "alec-benjamin"){
    try{
        const songs = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${searchText || DEFALUT_ARTIST}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                "x-rapidapi-key": "678607cc0amsh199183a745fa718p1838ddjsn7c9ccbda4f93"
            }
        });
        return await songs.json();
    }catch {
        return [];
    }
}
export const debounce = (func, delay) => { 
    let debounceTimer; 
    return function() { 
        const context = this;
        const args = arguments; 
            clearTimeout(debounceTimer); 
            debounceTimer = setTimeout(() => func.apply(context, args), delay) 
    } 
}  