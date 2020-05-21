import styles from './searchbox.module.scss';
export default (props) => {
    return (
        <div className={styles.searchBox} >
            <input 
                style={props.style}
                onChange={props.onChange}
                placeholder={props.placeholder} 
                type="search"
                name="search" 
            />
            {props.isLoading && <div className={`audio-loading ${styles.audioLoading}`}></div>}
        </div>
    );
}