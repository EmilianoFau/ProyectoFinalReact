// EditProfileModal.jsx
import React, { useState } from "react";
import Styles from "./index.module.css";

const Modal = ({ currentUser, onClose, onSave }) => {
    const [name, setName] = useState(currentUser.user.name);
    const [username, setUsername] = useState(currentUser.user.username);
    const [bio, setBio] = useState(currentUser.user.bio || "");
    const [profileImage, setProfileImage] = useState(currentUser.user.profileImage || "");

    const handleSave = () => {
        const updatedProfile = {
            name,
            username,
            bio,
            profileImage,
        };
        onSave(updatedProfile);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(URL.createObjectURL(file));
        }
    };

    return (
        <div className={Styles.modalOverlay}>
            <div className={Styles.modalContent}>
                <button className={Styles.closeButton} onClick={onClose}>X</button>
                <h2>Edit Profile</h2>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                    Bio:
                    <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
                </label>
                <label>
                    Profile Image:
                    <input type="file" onChange={handleImageChange} />
                    {profileImage && <img src={profileImage} alt="Profile preview" className={Styles.imagePreview} />}
                </label>
                <button className={Styles.saveButton} onClick={handleSave}>Save</button>
            </div>
        </div>
    );
};

export default Modal;
