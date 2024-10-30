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
        <>
            <div className={Styles.headers}>
                <div className={Styles.username}>
                    <h2>{userProfile.user.username}</h2>
                </div>
            </div>
            <div className={Styles.container}>
                <div className={Styles.profileContainer}>
                    <img src="" alt="Profile" />
                    <div className={Styles.stats}>
                        <h5>{userProfile.posts.length}</h5>
                        <span>Posts</span>
                        <h5>{userProfile.user.friends.length}</h5>
                        <span>Friends</span>
                    </div>
                </div>
                <div className={Styles.description}>
                    <h4>description</h4>
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
        </>
    );
}

export default Profile;
