import React, { useState } from "react";

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
        formData.append("file", image);

        try {
            const response = await fetch('http://localhost:3001/api/posts/upload', {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Error while uploading image");
            }

            const data = await response.json();
            setMessage("Image uploaded successfully: " + data.message);
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
