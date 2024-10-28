import Styles from "./index.module.css";
import { useNavigate } from "react-router-dom";

export function Profile() {
    const navigate = useNavigate();
    return (
        <>
            <div className={Styles.headers}>
                <div className={Styles.username}>
                    <h2>UnUsername</h2>
                </div>
            </div>
            <div className={Styles.container}>
                <div className={Styles.profileContainer}>
                    <img src="" alt="Profile" />
                    <div className={Styles.stats}>
                        <h5>153</h5>
                        <span>Posts</span>
                        <h5>209</h5>
                        <span>Friends</span>
                    </div>
                </div>
                <div className={Styles.description}>
                    <h3>name</h3>
                    <h4>description</h4>
                </div>
                <div className={Styles.edit}>
                    <button>Edit Profile</button>
                </div>
                <div className={Styles.postContainer}></div>
                <div className={Styles.bottomContainer}>
                    <button
                        onClick={() => {
                            navigate("/MyFeed");
                        }}
                    >
                        Atras
                    </button>
                </div>
            </div>
        </>
    );
}

export default Profile;
