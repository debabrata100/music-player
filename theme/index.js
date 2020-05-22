const primaryColor = '#ff0088';
const secondaryColor = '#1D1D1D';
const lightBlack = 'rgba(0,0,0,0.6)'
const lightColor = '#ffffff';
export default {
    darkMode: {
        header: {
            backgroundColor: secondaryColor
        },
        searchBox: {
            border: '1px solid #000',
            backgroundColor: '#000',
            color: '#fff'
        },
        main: {
            backgroundColor: '#000'
        },
        songInfo: {
            color: '#fff'
        },
        songDetails:{
            backgroundColor: '#000',
            color: '#fff'
        }
    },
    lightMode: {
        header: {
            backgroundColor: primaryColor
        },
        searchBox: {
            border: '1px solid #f08',
            backgroundColor: '#fff',
            color: lightBlack
        },
        main: {
            backgroundColor: '#fff'
        },
        songInfo: {
            color: '#000'
        },
        songDetails:{
            backgroundColor: '#fff',
            color: '#000'
        }
    }
}
