import React from 'react';
import styles from './Dropdown.module.css';

const Dropdown = () => {
    
    return(
        <div className={`absolute z-50 ${styles.right_d27} ${styles.top_d55}`}>            
            <div className="w-full w-80 border-solid border border-black-600 p-7 bg-white">
                <button>Log Out</button>
            </div>
        </div>
    )
}
export default Dropdown;