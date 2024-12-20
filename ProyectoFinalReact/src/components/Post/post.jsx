import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../../contexts/posts";
import { apiURL } from "../const";
import {
  deleteData,
  postDataApplicationJson,
  getElement,
  getData,
  deleteDataWithToken,
} from "../../shared/server";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  Ellipsis,
  ArrowUpToLine,
} from "lucide-react";
import Styles from "./index.module.css";

const Post = ({ post, shouldFetchPostsAgain }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [activeComment, setActiveComment] = useState(false);
  const [comment, setComment] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [comments, setComments] = useState([]);
  const [shouldFetchComments, setShouldFetchComments] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComments = async () => {
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

      const currentPost = data.filter((p) => p._id === post._id)[0];

      const postComments = currentPost.comments;

      const commentPromises = postComments.map(async (comment) => {
        const data = await getElement(
          "http://localhost:3001/api/posts/comments",
          comment._id,
          token
        );
        return data;
      });

      const commentsData = await Promise.all(commentPromises);

      setComments(commentsData);
    };

    if (shouldFetchComments) {
      fetchComments();
      setShouldFetchComments(false);
    }
  }, [post, shouldFetchComments]);

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
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      if (isLiked) {
        await deleteDataWithToken(`http://localhost:3001/api/posts/${post._id}/like`, token);
        setIsLiked(false);
      } else {
        await postDataApplicationJson(
          `http://localhost:3001/api/posts/${post._id}/like`,
          null,
          token
        );
        setIsLiked(true);
      }
    } catch (error) {
      console.error("Error while fetching like", error);
    }
  };

  const handleCommentClick = () => {
    activeComment ? setActiveComment(false) : setActiveComment(true);
  };

  const submitComment = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const newComment = await postDataApplicationJson(
        `http://localhost:3001/api/posts/${post._id}/comments`,
        JSON.stringify({ content: comment }),
        token
      );
      setComment("");
      setActiveComment(false);

      setShouldFetchComments(true);
    } catch (error) {
      console.error("Error al enviar el comentario:", error);
    }
  };

  const goToPostProfile = () => {
    if (post.user._id == localStorage.getItem('profileId')) {
        navigate('/MyProfile');
    }
    else {
        localStorage.setItem('friendId', post.user._id);
        navigate('/FriendProfile');
    }
  };

  return (
    <div className={Styles.post}>
      <div className={Styles.postHeader}>
        <h3 className={Styles.username}>
          <span className={Styles.usernameLink} onClick={goToPostProfile} >{post.user.username}</span>

          <p className={Styles.time}>· {timeAgo(post.createdAt)}</p>
        </h3>
      </div>
      <img src={`${apiURL}${post.imageUrl}`} alt={post.caption} className={Styles.postImage} />
      <div className={Styles.icons}>
        <Heart
          onClick={handleLikeClick}
          color={isLiked ? "red" : "gray"}
          className={`${isLiked ? Styles.liked : ""} ${
            isAnimating ? Styles.animate : ""
          }`}
        />
        <MessageCircle onClick={handleCommentClick} />
        <Send />
        <Bookmark />
      </div>
      <p className={Styles.caption}>{post.caption}</p>

      <div
        className={`${activeComment ? "" : Styles.hideComment} ${
          Styles.commentBox
        }`}
      >
        <input
          type="text"
          placeholder="Comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></input>
        <div>
          <ArrowUpToLine onClick={submitComment} />
        </div>
      </div>

      <div>
        {comments.map((comment) => (
          <div key={comment._id}>
            <i>{comment.user.username}</i> · {comment.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;
