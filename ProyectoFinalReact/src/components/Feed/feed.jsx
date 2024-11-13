import React, { useState, useEffect} from "react";
import { getData } from "../../shared/server.jsx";
import { usePosts } from "../../contexts/posts.jsx";
import Styles from './index.module.css';
import Post from "../Post/post.jsx";
import Card from "../Card/card.jsx";

export function Feed() {
    const { posts, setPosts } = usePosts();
    const [ shouldFetchPosts, setShouldFetchPosts ] = useState(true);

    const fetchPosts = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                console.error("No token found");
                return; 
            }

            const data = await getData('http://localhost:3001/api/posts/feed', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setPosts(data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPostsAgain = () => {
        fetchPosts();
    };

    return(
        /*el Card es para hacer el carrusel de los usuarios*/
        <ul className={Styles.feedContainer}>
            {posts.map((post) => (
                <li key={post._id} className={Styles.feed}>
                    <Post post={post} className={Styles.post} shouldFetchPostsAgain={fetchPostsAgain}/>
                </li>
            ))}
        </ul>
    );
}

export default Feed;