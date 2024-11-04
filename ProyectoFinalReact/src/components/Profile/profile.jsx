import Styles from "./index.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Profile({ userId }) {
    const navigate = useNavigate();

    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [username, setUsername] = useState('');
    const [profilePicture, setProfilePicture] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("No token found");
                    return; 
                }

                const response = await fetch(`http://localhost:3001/api/user/profile/${userId}`, {
                    method: 'GET',
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

    const handleBackClick = () => {
        navigate('/MyFeed');
    };

    const openEditModal = () => setShowEditModal(true);
    const closeEditModal = () => setShowEditModal(false);

    const handleEditSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:3001/api/user/profile/edit`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    profilePicture: profilePicture
                }),
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el perfil');
            }

            const data = await response.json();
            setUserProfile(data.user);
            closeEditModal();
            console.log(data.message);
        } catch (error) {
            console.error(error);
            alert("Error al actualizar el perfil. Inténtalo de nuevo.");
        }
    };

    return (
        <>
            <div className={Styles.headers}>
                <div className={Styles.username}>
                    <h2>{userProfile.user.username}</h2>
                </div>
            </div>
            <div className={Styles.container}>
                <div className={Styles.profileContainer}>
                    <img src={userProfile.user.profilePicture} alt="Profile" />
                    <div className={Styles.stats}>
                        <h5>{userProfile.posts.length}</h5>
                        <span>Posts</span>
                        <h5>{userProfile.user.friends.length}</h5>
                        <span>Friends</span>
                    </div>
                </div>
                <div className={Styles.description}>
                    <h4>Description: {userProfile.user.description || "No description available"}</h4>
                </div>
                <div className={Styles.edit}>
                    <div className={Styles.editButton}>
                        <button onClick={openEditModal}>Edit Profile</button>
                    </div>
                </div>
                <div className={Styles.bottomContainer}>
                    <button onClick={handleBackClick}>Atrás</button>
                </div>
            </div>

            {showEditModal && (
                <div className={Styles.modal}>
                    <div className={Styles.modalContent}>
                        <span className={Styles.close} onClick={closeEditModal}>&times;</span>
                        <h3>Editar Perfil</h3>
                        <form onSubmit={handleEditSubmit} className={Styles.compactForm}>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Nuevo nombre de usuario"
                                required
                            />
                            <input
                                type="text"
                                value={profilePicture}
                                onChange={(e) => setProfilePicture(e.target.value)}
                                placeholder="URL de la foto de perfil"
                                required
                            />
                            <button type="submit">Guardar</button>
                        </form>
                    </div>
                </div>
            )}
        </>
        
    );
}

export default Profile;
