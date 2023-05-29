import React, {Fragment} from 'react';
import {useState} from 'react';
import Search from './Search';

const Header = props => {
    const [dropdownIsShown, setdropdownIsShown] = useState(false);

    const dropdownHandler = () => {
        setdropdownIsShown(!dropdownIsShown);
        props.onDropdown(dropdownIsShown);
    }

    return(
        <React.Fragment>
            <div className="grid gap-5 grid-cols-4 md:grid-cols-4 lg:grid-cols-4">
                <div className="flex items-center">
                    <div>LOGO ICON</div>
                </div> 
                <div className="col-span-2 md:col-span-2 lg:col-span-2 flex items-center">
                    <Search />
                </div>  
                <div className="flex items-center justify-end">
                    <div className="flex items-center">
                        {/* <p>Hey Buddy!</p> */}
                        <div className="flex items-center">
                            {/* <div className="mr-6">
                                <svg width="24" height="24" viewBox="0 0 32 32"><title/><g data-name="Layer 30" id="Layer_30"><path className="cls-1" d="M27,27H5a1,1,0,0,1-.89-1.45,18.14,18.14,0,0,0,1.89-8V14a10,10,0,0,1,20,0v3.53a18.14,18.14,0,0,0,1.89,8A1,1,0,0,1,27,27ZM6.55,25h18.9A20.14,20.14,0,0,1,24,17.53V14A8,8,0,0,0,8,14v3.53A20.14,20.14,0,0,1,6.55,25Z"/><path className="cls-1" d="M16,31a5,5,0,0,1-5-5,1,1,0,0,1,2,0,3,3,0,0,0,.88,2.12,3.08,3.08,0,0,0,4.24,0,1,1,0,0,1,1.42,1.42A5,5,0,0,1,16,31Z"/><path className="cls-1" d="M16,6a1,1,0,0,1-1-1V2a1,1,0,0,1,2,0V5A1,1,0,0,1,16,6Z"/></g></svg>                        
                            </div> onClick={dropdownHandler}  */}
                            <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full">
                                    <img className="border border-[#1473E6] border-2 object-cover rounded-full w-full h-full" src="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&h=1280&q=80" />
                                </div>
                                <div>
                                    <svg width="20" height="20" viewBox="0 0 32 32"><path d="M13,16c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,14.346,13,16z" id="XMLID_294_"/><path d="M13,26c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,24.346,13,26z" id="XMLID_295_"/><path d="M13,6c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,4.346,13,6z" id="XMLID_297_"/></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default Header;