import React, { useState } from "react";
import Styles from "./index.module.css";
import { Link, useLocation } from "react-router-dom";
import BurgerMenu from "../BurgerMenu/burgerMenu.jsx";
import { SquarePlus, Heart, AlignJustify } from "lucide-react";

const Header = () => {
    const location = useLocation();
    const { pathname } = location;
    const [isBurgerMenuOpen, setBurgerMenuOpen] = useState(false);

    const toggleBurgerMenu = () => {
        setBurgerMenuOpen((prev) => !prev);
    };

    const handleLogout = () => {
        console.log("Logout");
    };

    const toggleTheme = () => {
        console.log("Toggle Theme");
    };

    if (pathname === "/Post") return null;

    return (
        <nav className={Styles.container}>
            <ul className={Styles.headerIcons}>
                {pathname === "/MyFeed" && (
                    <>
                        <li className={`${Styles.iconItem} ${location.pathname === "/Notifications" ? Styles.active : ""}`}>
                            <Link to="/Notifications" className={Styles.link}>
                                <Heart />
                            </Link>
                        </li>
                        <li className={`${Styles.iconItem} ${location.pathname === "/Create" ? Styles.active : ""}`}>
                            <Link to="/Create" className={Styles.link}>
                                <SquarePlus />
                            </Link>
                        </li>
                    </>
                )}

                {pathname === "/MyProfile" && (
                    <>
                        <li className={`${Styles.iconItem} ${location.pathname === "/Create" ? Styles.active : ""}`}>
                            <Link to="/Create" className={Styles.link}>
                                <SquarePlus />
                            </Link>
                        </li>
                        <li className={`${Styles.iconItem} ${Styles.link}`} onClick={toggleBurgerMenu}>
                            <AlignJustify />
                        </li>
                    </>
                )}

                {pathname === "/FriendProfile" && (
                    <li className={`${Styles.iconItem} ${location.pathname === "/Create" ? Styles.active : ""}`}>
                        <Link to="/Create" className={Styles.link}>
                            <SquarePlus />
                        </Link>
                    </li>
                )}
                {isBurgerMenuOpen && (
                    <BurgerMenu onLogout={handleLogout} onToggleTheme={toggleTheme} />
                )}
            </ul>
        </nav>
    );
};

export default Header;