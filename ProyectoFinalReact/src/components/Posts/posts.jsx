import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../contexts/users.jsx";
import { postData } from "../../shared/server"; 
import Styles from './posts.module.css'; 

export function Posts() {
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null); 
    const navigate = useNavigate();
    const { user } = useUsers(); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', image); //'image' tiene que coincidir con lo que espera el backend
        formData.append('caption', caption);

        try {
            const { response } = await postData('http://localhost:3001/api/posts/upload', formData, {
                headers: {
                    'Authorization': `Bearer ${user.token}`, //incluir el token del usuario
                },
            });

            if (response.ok) {
                // Redirigir a MyFeed después de crear el post
                navigate('/MyFeed');
            } else {
                console.error('Error al crear la publicación');
            }
        } catch (err) {
            console.error('Error: ', err);
        }
    };

    return (
        <div className={Styles.postsContainer}>
            <h2>Create a New Post</h2>
            <form onSubmit={handleSubmit} className={Styles.postForm}>
                <label htmlFor="caption">Caption:</label>
                <input
                    type="text"
                    id="caption"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                />
                <label htmlFor="image">Image:</label>
                <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <button type="submit">Submit Post</button>
            </form>
        </div>
    );
}

export default Posts;
