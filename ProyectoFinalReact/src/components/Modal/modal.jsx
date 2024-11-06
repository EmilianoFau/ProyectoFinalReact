import React, { useState } from "react";
import Styles from "./index.module.css";
import { useUsers } from "../../contexts/users.jsx";
import { putData } from "../../shared/server.jsx";

const Modal = ({ currentUser, onClose }) => {
    const [name, setName] = useState(currentUser.user.name);
    const [username, setUsername] = useState(currentUser.user.username);
    const [bio, setBio] = useState(currentUser.user.bio || "");
    const [profileImage, setProfileImage] = useState(currentUser.user.profileImage || "");
    const { setUsers } = useUsers();

    const handleEditUser = async (event) => {
        event.preventDefault();
        
        const updatedProfile = {
            _id: currentUser.user._id,
            name,
            username,
            bio,
            profileImage,
        };

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                console.error("No token found");
                return; 
            }

            const response = await putData('http://localhost:3001/api/user/profile/edit', updatedProfile, token);
            if (response.ok) {
                console.log('Profile updated ', response);
                setUsers((prevUsers) =>
                    prevUsers.map((user) => (user._id === currentUser.user._id ? { ...user, ...updatedProfile } : user))
                );            
            }
            onClose();
        } catch(error) {
            console.error("Error: ", error);
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(URL.createObjectURL(file));
        }
    };

    return (
        <div className={Styles.modalOverlay}>
            <div className={Styles.modalContent}>
                <h2>Edit Profile</h2>
                <form onSubmit={handleEditUser}>
                    <label>
                        Name:
                        <input 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                        />
                    </label>
                    <label>
                        Username:
                        <input 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                        />
                    </label>
                    <label>
                        Bio:
                        <textarea 
                            value={bio} 
                            onChange={(e) => setBio(e.target.value)} 
                        />
                    </label>
                    <label>
                        Profile Image:
                        <input type="file" onChange={handleImageChange} />
                        {profileImage && <img src={profileImage} alt="Profile preview" className={Styles.imagePreview} />}
                    </label>
                    <button type="submit" className={Styles.saveButton}>Save</button>
                    <button onClick={onClose} className={`${Styles.modalButton} ${Styles.cancelButton}`}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default Modal;
