export default ({ isOn, onClick }) => {
    return (
        <div className={`toggle-player ${!isOn ? 'invert' : ''}`} onClick={onClick}></div>
    );
}