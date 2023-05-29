import React from 'react';
import {useState} from 'react';
import styles from "./Newsfeed.module.css";

const Newsfeed = props => {
    const [userIsRegister, setUserIsRegister] = useState(false);  
    
    const toggleCommentHandler = () => {

    }
    
    return(
        <div className="mt-8">         
            <div className="w-full sm-w-full 2xl:max-w-2xl xl:max-w-xl lg:max-w-lg max-w-md border-solid border border-black-600 p-7 mb-8">
                <div className='flex items-center'>
                    <div className="w-14 h-14 rounded-full">
                        <img className="object-cover rounded-full w-full h-full" src="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&h=1280&q=80" />
                    </div>
                    <div>
                        <p className={`ml-3 inline-block align-middle`}>Izak Van</p>
                        <p className={`ml-3 text-[#0ea5e9]} ${styles.post_time}`}>2023-5-26</p>
                    </div>
                </div>
                <p className={`mt-4 ${styles.newsfeed_info}`}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo</p>
                <div className='pt-3 border-t border-[#DCDCDC] mt-5'>
                    <div className="grid grid-cols-3 gap-2">
                        <div>
                            <svg width="27px" height="27px" id="Layer_1" viewBox="0 0 512 512"><path d="M413.1,327.3l-1.8-2.1l-136-156.5c-4.6-5.3-11.5-8.6-19.2-8.6c-7.7,0-14.6,3.4-19.2,8.6L101,324.9l-2.3,2.6  C97,330,96,333,96,336.2c0,8.7,7.4,15.8,16.6,15.8v0h286.8v0c9.2,0,16.6-7.1,16.6-15.8C416,332.9,414.9,329.8,413.1,327.3z"/></svg>
                        </div>
                        <div>
                            <svg height="27px" width="27px" viewBox="0 0 512 512"><path d="M98.9,184.7l1.8,2.1l136,156.5c4.6,5.3,11.5,8.6,19.2,8.6c7.7,0,14.6-3.4,19.2-8.6L411,187.1l2.3-2.6  c1.7-2.5,2.7-5.5,2.7-8.7c0-8.7-7.4-15.8-16.6-15.8v0H112.6v0c-9.2,0-16.6,7.1-16.6,15.8C96,179.1,97.1,182.2,98.9,184.7z"/></svg>
                        </div>
                        <button onClick={toggleCommentHandler}>
                            <svg height="20px" width="20px" viewBox="0 0 128 128"><title/><path d="M113,0H15A15,15,0,0,0,0,15V79.57a15,15,0,0,0,15,15H38.28a1,1,0,0,1,1,1V121a7,7,0,0,0,11.95,4.95L82.31,94.87a1,1,0,0,1,.71-.29h30a15,15,0,0,0,15-15V15A15,15,0,0,0,113,0Zm9,79.57a9,9,0,0,1-9,9H83a7,7,0,0,0-4.95,2L47,121.7a1,1,0,0,1-1.71-.71V95.57a7,7,0,0,0-7-7H15a9,9,0,0,1-9-9V15a9,9,0,0,1,9-9h98a9,9,0,0,1,9,9Z"/></svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-full sm-w-full 2xl:max-w-2xl xl:max-w-xl lg:max-w-lg max-w-md border-solid border border-black-600 p-7">
                <div className='flex items-center'>
                    <div className="w-14 h-14 rounded-full">
                        <img className="object-cover rounded-full w-full h-full" src="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&h=1280&q=80" />
                    </div>
                    <div>
                        <p className={`ml-3 inline-block align-middle`}>Izak Van</p>
                        <p className={`ml-3 text-[#0ea5e9]} ${styles.post_time}`}>2023-5-26</p>
                    </div>
                </div>
                <p className={`mt-4 ${styles.newsfeed_info}`}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo</p>
                <div className='pt-3 border-t border-[#DCDCDC] mt-5'>
                    <div className="grid grid-cols-3 gap-2">
                        <div>
                            <svg width="27px" height="27px" id="Layer_1" viewBox="0 0 512 512"><path d="M413.1,327.3l-1.8-2.1l-136-156.5c-4.6-5.3-11.5-8.6-19.2-8.6c-7.7,0-14.6,3.4-19.2,8.6L101,324.9l-2.3,2.6  C97,330,96,333,96,336.2c0,8.7,7.4,15.8,16.6,15.8v0h286.8v0c9.2,0,16.6-7.1,16.6-15.8C416,332.9,414.9,329.8,413.1,327.3z"/></svg>
                        </div>
                        <div>
                            <svg height="27px" width="27px" viewBox="0 0 512 512"><path d="M98.9,184.7l1.8,2.1l136,156.5c4.6,5.3,11.5,8.6,19.2,8.6c7.7,0,14.6-3.4,19.2-8.6L411,187.1l2.3-2.6  c1.7-2.5,2.7-5.5,2.7-8.7c0-8.7-7.4-15.8-16.6-15.8v0H112.6v0c-9.2,0-16.6,7.1-16.6,15.8C96,179.1,97.1,182.2,98.9,184.7z"/></svg>
                        </div>
                        <div>
                            <svg height="20px" width="20px" viewBox="0 0 128 128"><title/><path d="M113,0H15A15,15,0,0,0,0,15V79.57a15,15,0,0,0,15,15H38.28a1,1,0,0,1,1,1V121a7,7,0,0,0,11.95,4.95L82.31,94.87a1,1,0,0,1,.71-.29h30a15,15,0,0,0,15-15V15A15,15,0,0,0,113,0Zm9,79.57a9,9,0,0,1-9,9H83a7,7,0,0,0-4.95,2L47,121.7a1,1,0,0,1-1.71-.71V95.57a7,7,0,0,0-7-7H15a9,9,0,0,1-9-9V15a9,9,0,0,1,9-9h98a9,9,0,0,1,9,9Z"/></svg>
                        </div>
                    </div>
                </div>
            </div>            
        </div>
    )
}
export default Newsfeed;