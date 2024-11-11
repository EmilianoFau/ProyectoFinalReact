import React from "react";
import Styles from "./index.module.css";
import { Link, useLocation } from "react-router-dom";
import { UserRound, House } from "lucide-react";

const Footer = () => {
    const location = useLocation();

    return (
        <nav className={Styles.container}>
            <ul className={Styles.footerIcons}>
                <li className={`${Styles.iconItem} ${location.pathname === "/MyFeed" ? Styles.active : ""}`}>
                    <Link to="/MyFeed" className={Styles.link}>
                        <House />
                    </Link>
                </li>
                <li className={`${Styles.iconItem} ${location.pathname === "/MyProfile" ? Styles.active : ""}`}>
                    <Link to="/MyProfile" className={Styles.link}>
                        <UserRound />
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Footer;