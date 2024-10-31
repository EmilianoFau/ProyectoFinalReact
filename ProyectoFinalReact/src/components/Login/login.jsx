import React, { useState } from "react";
import Modal from "../RegisterModal/registerModal.jsx";
import { useNavigate } from "react-router-dom";
import Styles from "./login.module.css";
import { getData, postDataLogin } from "../../shared/server.jsx";
import { useUsers } from "../../contexts/users.jsx";

const Login = () => {
    // const { users, setUsers } = useUsers();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [openRegisterModal, setOpenRegisterModal] = useState(false);
    const [showWrongPassword, setShowWrongPassword] = useState(false);
    const navigate = useNavigate();

    const closeModal = () => {
        setOpenRegisterModal(false);
    };

    const convertToJson = () => {
        return {
            email,
            password,
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Email:", email);
        console.log("Password:", password);
        const loginUser = convertToJson();
        try {
            const { response, result } = await postDataLogin('http://localhost:3001/api/auth/login', loginUser);
            console.log(response.status)
            console.log(result);
            localStorage.setItem('profileId', result._id);
            if (response.ok) {
                console.log(result.token);
                localStorage.setItem("token", result.token);
                setShowWrongPassword(false);
                navigate("/MyFeed");
            } else {
                if (response.status == 401) {
                    setShowWrongPassword(true);
                }
            }   
        } catch(error) {
            console.error("Error: ", error);
        }
    };

    const handleRegistration = (e) => {
        e.preventDefault();
        setOpenRegisterModal(true);
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className={Styles.loginForm}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
                <div className={Styles.wrongPassword}>{showWrongPassword ? `Wrong email and/or password` : null}</div>
                <button onClick={handleRegistration}>Register</button>
            </form>
            {openRegisterModal && <Modal closeModal={closeModal} />}
        </div>
    );
}

export default Login;