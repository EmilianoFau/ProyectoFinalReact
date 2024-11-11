import React, { useState } from "react";
import { postData } from "../../shared/server";
import Styles from "./index.module.css";

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

        console.log(formData);
        console.log(image);

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found");
                return; 
            }

            const { response, result } = await postData('http://localhost:3001/api/posts/upload', formData, token);

            if (response.ok) {
                setMessage("Image uploaded successfully");
                console.log('Upload successful: ', result);
            } else {
                throw new Error(result.error?.message || "Error while uploading image");
            }
        } catch (error) {
            console.error("Error while uploading image: ", error);
            setMessage(error.message || "Error while uploading image");
        }
    };

    return (
        <div className={Styles.container}>
            <h2 className={Styles.heading}>Upload Image</h2>
            <form onSubmit={handleSubmit}>
                <small className={Styles.inputWrapper}><input type="file" onChange={handleImageChange} accept="image/*" className={Styles.inputFile} /></small>
                <button type="submit" className={Styles.submitButton}>Upload Image</button>
            </form>
            {message && <p className={Styles.message}>{message}</p>}
        </div>
    );
};

export default Create;
