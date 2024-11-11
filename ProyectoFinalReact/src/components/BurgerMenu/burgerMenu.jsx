import Styles from "./index.module.css";

const BurgerMenu = ({ onLogout, onToggleTheme }) => {
    return (
        <div className={Styles.menu}>
            <button className={Styles.menuItem} onClick={onToggleTheme}>
                Change mode
            </button>
            <button className={Styles.menuItem} onClick={onLogout}>
                Logout
            </button>
        </div>
    );
};

export default BurgerMenu;
