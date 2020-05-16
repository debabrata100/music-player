// import './switch.scss';
import { useRef } from 'react';

export default ({ onChange }) => {
    const switchRef = useRef();
    const handleClick = (e) => {
        let el = e.target;
        if (el.getAttribute("aria-checked") == "true") {
            el.setAttribute("aria-checked", "false");
            onChange(false);
        } else {
            el.setAttribute("aria-checked", "true");
            onChange(true);
        }
    }
    return (
        <button role="switch" 
            aria-checked="true"
            id="switch-btn" className="switch" ref={switchRef} onClick={handleClick}>
            <span>Light</span>
            <span>Dark</span>
        </button>
    );
}