import React from "react";
import Styles from "./index.module.css";
import { Link, useLocation } from "react-router-dom";
import { UserRound, SquarePlus, Heart, House } from "lucide-react";

const Navbar = () => {
    const location = useLocation();

    return (
        <div className={Styles.navbar}>
            <h1 className={Styles.logo}>fakestagram</h1>
            <nav className={Styles.container}>
                <ul>
                    <li className={location.pathname === "/MyFeed" ? Styles.active : ""}>
                        <Link to="/MyFeed">
                            <House />
                            <span className={Styles["nav-text"]}>&nbsp;&nbsp;Home</span>
                        </Link>
                    </li>
                    <li className={location.pathname === "/Notifications" ? Styles.active : ""}>
                        <Link to="/Notifications">
                            <Heart />
                            <span className={Styles["nav-text"]}>&nbsp;&nbsp;Notifications</span>
                        </Link>
                    </li>
                    <li className={location.pathname === "/Create" ? Styles.active : ""}>
                        <Link to="/Create">
                            <SquarePlus />
                            <span className={Styles["nav-text"]}>&nbsp;&nbsp;Create</span>
                        </Link>
                    </li>
                    <li className={location.pathname === "/MyProfile" ? Styles.active : ""}>
                        <Link to="/MyProfile">
                            <UserRound />
                            <span className={Styles["nav-text"]}>&nbsp;&nbsp;Profile</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;