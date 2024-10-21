import React, { useState } from "react";
import Modal from "../Modal/modal.jsx";
import { useNavigate } from "react-router-dom";
import Styles from "./login.module.css";
import { getData } from "../../shared/server.jsx";
import { useUsers } from "../../contexts/users.jsx";

const Login = () => {
    const { users, setUsers } = useUsers();
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [openRegisterModal, setOpenRegisterModal] = useState(false);
    const navigate = useNavigate();

    const closeModal = () => {
        setOpenAddModal(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("User:", user);
        console.log("Password:", password);
        navigate("/MyFeed");
    };

    const handleRegistration = () => {
        setOpenRegisterModal(true);
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className={Styles.loginForm}>
                <label htmlFor="user">User:</label>
                <input
                    type="text"
                    id="text"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
                <button onClick={handleRegistration}>Register</button>
                {openRegisterModal && <Modal closeModal={closeModal} />}
            </form>
        </div>
    );
}

export default Login;