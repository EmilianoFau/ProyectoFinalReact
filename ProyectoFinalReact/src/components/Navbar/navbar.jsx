import React from "react";
import Styles from "./index.module.css";
import { Link, useLocation } from "react-router-dom";
import { UserRound, SquarePlus, Heart, House } from "lucide-react";

const Navbar = () => {
    const location = useLocation();

    return (
        <div className={Styles.navbar}>
            <h1 className={Styles.logo}>fakestagram</h1>
            <nav>
                <ul>
                    <li className={location.pathname === "/MyFeed" ? Styles.active : ""}>
                        <Link to="/MyFeed">
                            <House />&nbsp;&nbsp;Home
                        </Link>
                    </li>
                    <li className={location.pathname === "/Notifications" ? Styles.active : ""}>
                        <Link to="/Notifications">
                            <Heart />&nbsp;&nbsp;Notifications
                        </Link>
                    </li>
                    <li className={location.pathname === "/Create" ? Styles.active : ""}>
                        <Link to="/Create">
                            <SquarePlus />&nbsp;&nbsp;Create
                        </Link>
                    </li>
                    <li className={location.pathname === "/MyProfile" ? Styles.active : ""}>
                        <Link to="/MyProfile">
                            <UserRound />&nbsp;&nbsp;Profile
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;