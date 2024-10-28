import React, { useState, useEffect} from "react";
import { getData } from "../../shared/server.jsx";
import { usePosts } from "../../contexts/posts.jsx";

export function Feed() {
    const { posts, setPosts } = usePosts();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    console.error("No token found");
                    return; 
                }

                const data = await getData('http://localhost:3001/api/posts/feed', {
                    method:'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                console.log(data);
                setPosts(data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, []);

    return(
        <div>
            {posts.map(post => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                </div>
            ))}
        </div>
    );
}

export default Feed;