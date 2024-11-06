import Styles from "./index.module.css";
import { getElement } from "../../shared/server.jsx";
import { useState, useEffect } from "react";
import Modal from "../Modal/modal.jsx";
import { useNavigate } from "react-router-dom";

export function Profile({ userId }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        const loadData = async () => {
          try {
            const token = localStorage.getItem("token");

            if (!token) {
                console.error("No token found");
                return; 
            }

            const data = await getElement('http://localhost:3001/api/user/profile', userId, token);
            setCurrentUser(data);
            console.log(data);
          } catch (err) {
            setError(err.message);
            console.log("Error: ", err);
          } finally {
            setLoading(false);
          }
        };
    
        loadData();
    }, [userId, isEditModalOpen]);

    const handleBackClick = () => {
        navigate('/MyFeed');
    }

    const handleEditClick = () => {
        setIsEditModalOpen(true);
    };

    const handleModalClose = () => {
        setIsEditModalOpen(false);
    };

    return (
        <div>
            <div className={Styles.backButtonContainer}>
                <button onClick={handleBackClick} className={Styles.backButton}>Back</button>
            </div>
            {loading ? (
                <p className={Styles.loading}>Loading profile...</p>
            ) : error ? (
                <p className={Styles.error}>{error}</p>
            ) : currentUser ? (
            <>            
            <div className={Styles.profileHeader}>
                <div className={Styles.header}>
                    <h2>{currentUser.user.username}</h2>
                </div>
                <div className={Styles.info}>
                    <img src="" alt="Profile" />
                    <div>
                        <h5 className={Styles.headerNumber}>{currentUser.posts.length}</h5>
                        <span>Posts</span>
                    </div>
                    <div>
                        <h5 className={Styles.headerNumber}>{currentUser.user.friends.length}</h5>
                        <span>Friends</span>
                    </div>
                    
                </div>
                <div className={Styles.content}>
                    <p>{currentUser.user.username}</p>
                    <p>no existe pa</p>
                </div>
                <div className={Styles.editButton}>
                    <button onClick={handleEditClick}>Edit Profile</button>
                </div>
            </div>
            <div className={Styles.posts}>
            {currentUser.posts && currentUser.posts.length > 0 ? (
            currentUser.posts.map((post, index) => (
                <img key={index} src={`http://localhost:3001/${post.imageUrl}`} alt={post.caption} className={Styles.post} />
            ))
            ) : (
                <p>No posts available</p>
            )}
            </div>
            {isEditModalOpen && (
                <Modal
                    currentUser={currentUser}
                    onClose={handleModalClose}
                />
            )}
            </>
            ) : (
                <p className={Styles.loading}>No profile</p>
            )}
        </div>
    );
}

export default Profile;
