import React, { useState } from "react";
import { postData } from "../../shared/server";

const Create = () => {
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState("");

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!image) {
            setMessage("Select an image");
            return;
        }

        const formData = new FormData();
        formData.append("image", image);
        formData.append("caption", "Hola");

        try {
            const token = localStorage.getItem("token");
            console.log(token);
            if (!token) {
                console.error("No token found");
                return; 
            }

            const result = await postData('http://localhost:3001/api/posts/upload', formData, token);

            console.log(result);
            if (!result.ok) {
                throw new Error(result.error.message || "Error while uploading image");
            }

            setMessage("Image uploaded successfully: " + result.result.message);
        } catch (error) {
            console.error("Error while uploading image: ", error);
            setMessage("Error while uploading image");
        }
    };

    return (
        <div>
            <h2>Upload Image</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleImageChange} accept="image/*" />
                <button type="submit">Upload Image</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Create;
