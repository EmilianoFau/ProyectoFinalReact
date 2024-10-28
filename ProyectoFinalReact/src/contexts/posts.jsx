import { createContext, useContext, useState } from "react";

export const PostContext = createContext();

export const usePosts = () => {
    return useContext(PostContext);
}

export function PostsProvider ({ children }) {
    const [posts, setPosts] = useState([]);

    return (
        <PostContext.Provider value={{posts, setPosts}}>
            {children}
        </PostContext.Provider>
    );
};