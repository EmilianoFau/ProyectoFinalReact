import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { usePosts } from "../../contexts/posts";
import { deleteData, postDataApplicationJson, getElement } from "../../shared/server";
import { Heart, MessageCircle, Send, Bookmark, Ellipsis, ArrowUpToLine } from "lucide-react";
import Styles from './index.module.css';
import { apiURL } from "../const";

const Post = ({ post }) => {   
    const [isLiked, setIsLiked] = useState(false);
    const [activeComment, setActiveComment] = useState(false);
    const [comment, setComment] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                console.error("No token found");
                return; 
            }

            const postComments = post.comments;

            console.log(postComments);

            const commentPromises = postComments.map(async (commentId) => {
                console.log(commentId);
                const data = await getElement('http://localhost:3001/api/posts/comments', commentId, token);
                return data;
            });
            
            const commentsData = await Promise.all(commentPromises);
    
            setComments(commentsData);
        };

        fetchComments();
    }, [setComment]);

    console.log(comments);

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
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No token found");
            return; 
        }
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

    const handleCommentClick = () => {
        console.log(activeComment);
        activeComment ? setActiveComment(false) : setActiveComment(true);
        console.log(activeComment);
    }

    const submitComment = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No token found");
            return; 
        }
        const { response, result } = await postDataApplicationJson(`http://localhost:3001/api/posts/${post._id}/comments`, JSON.stringify({content: comment}), token);

        setComment('');
        setActiveComment(false);
    }

    console.log(post);

    console.log(comments);

    return(
        <div>
            <div className={Styles.postHeader}>
                <h3 className={Styles.username}>{post.user.username} <p className={Styles.time}>· {timeAgo(post.createdAt)}</p></h3>
            </div>
            <img src={`${apiURL}${post.imageUrl}`} alt={post.caption} className={Styles.postImage} />
            <div className={Styles.icons}>
                <Heart 
                    onClick={handleLikeClick} 
                    className={`${isLiked ? Styles.liked : ''} ${isAnimating ? Styles.animate : ''}`} />
                <MessageCircle
                    onClick={handleCommentClick}
                />
                <Send/>
                <Bookmark/>
            </div>
            <p className={Styles.caption}>{post.caption}</p>

            <div className={`${activeComment ? '' : Styles.hideComment} ${Styles.commentBox}`}>
                <input 
                    type="text" 
                    placeholder="Comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}></input>
                <div>
                    <ArrowUpToLine
                        onClick={submitComment}
                    />
                </div>
            </div>

            <div>
                {console.log(comments)}
                    {comments.map(comment => (
                    <div key={comment._id}>
                        <i>{comment.user.username}</i> · {comment.content}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Post;