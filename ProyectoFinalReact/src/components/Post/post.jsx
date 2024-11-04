import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { usePosts } from "../../contexts/posts";
import { deleteData, postDataApplicationJson } from "../../shared/server";
import { Heart, MessageCircle, Send, Bookmark, Ellipsis } from "lucide-react";
import Styles from './index.module.css';

const Post = ({ post }) => {   
    const [isLiked, setIsLiked] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const timeAgo = (timestamp) => {
        const now = new Date();
        const seconds = Math.floor((now - new Date(timestamp)) / 1000);
        
        let interval;

        interval = Math.floor(seconds / 604800);
        if (interval > 0) {
            return interval === 1 ? `1w` : `${interval}w`;
        }

        interval = Math.floor(seconds / 86400);
        if (interval > 0) {
            return interval === 1 ? `1d` : `${interval}d`;
        }

        interval = Math.floor(seconds / 3600);
        if (interval > 0) {
            return interval === 1 ? `1h` : `${interval}h`;
        }

        interval = Math.floor(seconds / 60);
        if (interval > 0) {
            return interval === 1 ? `1m` : `${interval}m`;
        }

        return seconds === 1 ? `1s` : `${seconds}s`;
    };

    const handleLikeClick = async () => {
        const postId = post.id;
        const url = `/api/posts/${postId}/like`;

        try {
            if (isLiked) {
                await deleteData(url); 
            } else {
                await postDataApplicationJson(url, JSON.stringify({}), token); 
                setIsAnimating(true);
                setTimeout(() => setIsAnimating(false), 500);
            }
            setIsLiked(!isLiked);
        } catch (error) {
            console.error("Error al manejar el like:", error);
        }
    };

    console.log(post);

    return(
        <div>
            <div className={Styles.postHeader}>
                <h3 className={Styles.username}>{post.user.username} <p className={Styles.time}>· {timeAgo(post.createdAt)}</p></h3>
            </div>
            <img src={`http://localhost:3001/${post.imageUrl}`} alt={post.caption} className={Styles.postImage} />
            <div className={Styles.icons}>
                <Heart 
                    onClick={handleLikeClick} 
                    className={`${isLiked ? Styles.liked : ''} ${isAnimating ? Styles.animate : ''}`} />
                <MessageCircle/>
                <Send/>
                <Bookmark/>
            </div>
            <p className={Styles.caption}>{post.caption}</p>
        </div>
    )
}

export default Post;