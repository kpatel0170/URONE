import React from 'react';

const CreatePostSidebarButton = () => {
    
    return(
        <div className="">            
            <button className="flex justify-center items-center w-full bg-[#1473E6] hover:bg-[#0e69d6] text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline hover:drop-shadow-md transition duration-100 ease-in-out" type="submit">
                <svg height="32px" width="32px" viewBox="0 0 32 32"><g id="Guides__x26__Forms"/><g id="Icons"><polygon fill="white" points="25,15 17,15 17,7 15,7 15,15 7,15 7,17 15,17 15,25 17,25 17,17 25,17  "/></g></svg>
                <p>Create Post</p>
            </button>
        </div>
    )
}
export default CreatePostSidebarButton;