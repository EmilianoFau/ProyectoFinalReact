import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../../contexts/posts";
import {
  deleteData,
  postDataApplicationJson,
  getElement,
  getData,
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
      console.log("empiezoooo");
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        return;
      }

      await shouldFetchPostsAgain;

      const postComments = post.comments;

      console.log(postComments);

      const commentPromises = postComments.map(async (comment) => {
        console.log(comment._id);
        const data = await getElement(
          "http://localhost:3001/api/posts/comments",
          comment._id,
          token
        );
        return data;
      });

      const commentsData = await Promise.all(commentPromises);

      setComments(commentsData);
      console.log("se actualizaron los comentarios");
    };

    if (shouldFetchComments) {
      fetchComments();
      setShouldFetchComments(false);
    }

    console.log("terminoooo");
  }, [shouldFetchComments, post]);

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
    const postId = post._id;
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
  };

  const submitComment = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      // Realizar el POST request para agregar el comentario
      await postDataApplicationJson(
        `http://localhost:3001/api/posts/${post._id}/comments`,
        JSON.stringify({ content: comment }),
        token
      );

      // Obtener la lista actualizada de comentarios
      const updatedComments = await Promise.all(
        post.comments.map(async (comment) => {
          const data = await getElement(
            "http://localhost:3001/api/posts/comments",
            comment._id,
            token
          );
          return data;
        })
      );

      setComments(updatedComments);

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

  console.log(post);

  console.log(comments);

  return (
    <div>
      <div className={Styles.postHeader}>
        <h3 className={Styles.username}>
          <span className={Styles.usernameLink} onClick={goToPostProfile} >{post.user.username}</span>

          <p className={Styles.time}>· {timeAgo(post.createdAt)}</p>
        </h3>
      </div>
      <img
        src={`http://localhost:3001/${post.imageUrl}`}
        alt={post.caption}
        className={Styles.postImage}
      />
      <div className={Styles.icons}>
        <Heart
          onClick={handleLikeClick}
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
        {console.log(comments)}
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
