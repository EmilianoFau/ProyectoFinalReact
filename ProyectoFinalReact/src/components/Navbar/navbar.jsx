import React from "react";
import Styles from "./index.module.css";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();

    return (
        <div className={Styles.navbar}>
            <h1 className={Styles.logo}>fakestagram</h1>
            <nav>
                <ul>
                    <li className={location.pathname === "/MyFeed" ? Styles.active : ""}>
                        <Link to="/MyFeed">
                            <span role="img" aria-label="Home">🏠</span> Home
                        </Link>
                    </li>
                    <li className={location.pathname === "/Notifications" ? Styles.active : ""}>
                        <Link to="/Notifications">
                            <span role="img" aria-label="Notifications">❤️</span> Notifications
                        </Link>
                    </li>
                    <li className={location.pathname === "/Create" ? Styles.active : ""}>
                        <Link to="/Create">
                            <span role="img" aria-label="Create">➕</span> Create
                        </Link>
                    </li>
                    <li className={location.pathname === "/MyProfile" ? Styles.active : ""}>
                        <Link to="/MyProfile">
                            <span role="img" aria-label="Profile">👤</span> Profile
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;