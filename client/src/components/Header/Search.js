import React from 'react';
import {useState} from 'react';

const Search = () => {
    const [searchValue, setSearchValue] = useState('');

    const searchInputHandler = (event)=>{
        setSearchValue(event.target.value);
    }

    const searchFormHandler = (event) => {
        event.preventDefault();
        console.log(searchValue)
        setSearchValue('')
    }

    return(     
        <form className="flex items-center w-full" onSubmit={searchFormHandler}>
            <div className="relative flex w-full flex-wrap items-stretch lg:px-6 md:px-6">
                <input
                type="input"
                className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l-full border border-r-0 border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:text-neutral-700 focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-none"
                placeholder="Search"
                aria-label="Search"
                onChange={searchInputHandler}
                value={searchValue}
                aria-describedby="button-addon1" />
                <button
                className="relative z-[2] flex items-center rounded-r-full border border-l-0 border-solid border-neutral-300 bg-primary px-3 py-1.5 text-xs font-medium uppercase leading-tight transition duration-150 ease-in-out hover:bg-primary-700 focus:bg-primary-700 focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                type="submit"
                id="button-addon1"
                data-te-ripple-init
                data-te-ripple-color="light">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4.1 11.06a6.95 6.95 0 1 1 13.9 0 6.95 6.95 0 0 1-13.9 0zm6.94-8.05a8.05 8.05 0 1 0 5.13 14.26l3.75 3.75a.56.56 0 1 0 .8-.79l-3.74-3.73A8.05 8.05 0 0 0 11.04 3v.01z" fill="currentColor"></path></svg>
                </button>
            </div>
        </form>
    )
}
export default Search;