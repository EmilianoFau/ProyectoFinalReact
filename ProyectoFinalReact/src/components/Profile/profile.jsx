import Styles from "./index.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Profile({ userId }) {
    const navigate = useNavigate();

    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
          try {
            const token = localStorage.getItem("token");

            if (!token) {
                console.error("No token found");
                return; 
            }

            const response = await fetch(`http://localhost:3001/api/user/profile/${userId}`, {
                method:'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
              throw new Error('Error en la red al obtener el perfil');
            }
            const data = await response.json();
            setUserProfile(data);
            console.log(data);
          } catch (err) {
            setError(err.message);
            console.log(err);
          } finally {
            setLoading(false);
          }
        };
    
        fetchUserProfile();
    }, [userId]);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className={Styles.container}>
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
                <div className={Styles.stats}>
                    <img src="" alt="Profile" />
                    <div>
                        <h5>{currentUser.posts.length}</h5>
                        <span><small>Posts</small></span>
                    </div>
                    <div>
                        <h5>{currentUser.user.friends.length}</h5>
                        <span><small>Friends</small></span>
                    </div>
                </div>
                <div className={Styles.edit}>
                    <button>Edit Profile</button>
                </div>
                <div className={Styles.postContainer}></div>
                <div className={Styles.bottomContainer}>
                    <button
                        onClick={() => {
                            navigate("/MyFeed");
                        }}
                    >
                        Atras
                    </button>
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
                    onSave={handleSaveProfile}
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
