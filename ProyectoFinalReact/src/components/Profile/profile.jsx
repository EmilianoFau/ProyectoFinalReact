import Styles from "./index.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Profile() {
    const navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchUserProfile = async () => {
          try {
            const token = localStorage.getItem("token");

            if (!token) {
                console.error("No token found");
                return; 
            }

            const response = await fetch(`http://localhost:3001/api/user/profile/${id}`, {
                method:'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
              throw new Error('Error en la red al obtener el perfil');
            }
            const data = await response.json();
            setCurrentUser(data);
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

    const handleBackClick = () => {
        navigate('/MyFeed');
    }

    return (
        <div>
            <div className={Styles.backButtonContainer}>
                <button onClick={handleBackClick} className={Styles.backButton}>Back</button>
            </div>
            {currentUser ? (
            <>            
            <div className={Styles.profileHeader}>
                <div className={Styles.header}>
                    <h2>{currentUser.user.username}</h2>
                </div>
                <div className={Styles.info}>
                    <img src="" alt="Profile" />
                    <h5>{currentUser.posts.length}</h5>
                    <span>Posts</span>
                    <h5>{currentUser.user.friends.length}</h5>
                    <span>Friends</span>
                </div>
                <div className={content}>
                    <p>{currentUser.user.username}</p>
                    <p>no existe pa</p>
                </div>
                <div className={Styles.editButton}>
                    <button>Edit Profile</button>
                </div>
            </div>
            <div className={Styles.posts}>
                
            </div>
            </>
            ) : (
                <p className={Styles.loading}>Loading profile...</p>
            )}
        </div>
    );
}

export default Profile;
