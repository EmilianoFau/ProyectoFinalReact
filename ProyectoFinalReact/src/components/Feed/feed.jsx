import React, { useEffect, useState } from "react";
import { getData } from "../../shared/server"; 
import Styles from './feed.module.css'; 

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPosts = async () => {
        try {
            const { response, result } = await getData('http://localhost:3001/api/posts/feed'); 
            if (response.ok) {
                setPosts(result);
            } else {
                throw new Error("Failed to fetch posts");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    if (loading) {
        return <div className={Styles.loading}>Loading...</div>;
    }

    if (error) {
        return <div className={Styles.error}>Error: {error}</div>;
    }

    return (
        <div className={Styles.feedContainer}>
            {posts.length > 0 ? (
                posts.map((post) => (
                    <div key={post._id} className={Styles.post}>
                        <img src={post.imageUrl} alt={post.caption} className={Styles.postImage} />
                        <div className={Styles.postInfo}>
                            <p className={Styles.caption}>{post.caption}</p>
                            <p className={Styles.author}><strong>Author:</strong> {post.user.username}</p>
                        </div>
                    </div>
                ))
            ) : (
                <div>No posts available</div>
            )}
        </div>
    );
};

export default Feed;
