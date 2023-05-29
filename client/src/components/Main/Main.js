import React from 'react';

import Header from '../Header/Header';
import Newsfeed from "../Home/Newsfeed";
import Sidebar from "../Sidebar/Sidebar";
import Footer from '../Footer/Footer';
import Dropdown from '../Dropdown/Dropdown';

const Main = props => {    
    
    return(
        <> 
            <div className="sticky top-0 left-0 right-0">
                <div className="header_wrap">
                    <Header/>
                </div>
            </div>           

            <main className="grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-4">
              <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-column justify-center px-5 md:px-0 lg:px-0">
                <Newsfeed /> 
              </div>  
              <Sidebar/>     

              <div className='bg-white fixed w-full bottom-0 p-4 border-t border-[#DCDCDC] block lg:hidden'>
                <Footer/>
              </div>       
            </main>
        </>
    )
}
export default Main;