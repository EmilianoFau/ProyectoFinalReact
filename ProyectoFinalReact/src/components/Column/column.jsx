import React from "react";
import Styles from "./column.module.css";
import { useNavigate } from "react-router-dom";

const Column = () => {
    return (
        <div className={Styles.column}>
            <h1 className={Styles.title}>fakestagram</h1>
            <button onClick={() => navigate("/MyFeed")}>My Feed</button>
            <button onClick={() => navigate("/MyProfile")}>Profile</button>
        </div>
    );
}

export default Column;