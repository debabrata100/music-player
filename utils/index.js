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

export async function requestSongs(searchText = ""){
    try{
        const songs = await fetch('http://www.mocky.io/v2/5ec2c2222f00009aafc355da');
        return await songs.json();
    }catch {
        return [];
    }

}