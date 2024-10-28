import "./profile.css";
import { useNavigate } from "react-router-dom";

export function Profile() {

    const navigate = useNavigate();
    return(
        <>
        <div id="headers">
            <div id="Username">
                <h2>UnUsername</h2>
            </div>
        </div>
            <div id="container">
                
                <div id="profile-container">
                    <img src="" />
                    <div id="stats">
                        <h5>153</h5>
                        <span>Posts</span>
                        <h5>209</h5>
                        <span>Friends</span>
                    </div>
                </div>
                <div id="description">
                    <h3>name</h3>
                    <h4>description</h4>
                </div>
                <div id="edit">
                    <button>Edit Profile</button>
                </div>
                <div id="post-container">
        
                </div>
                <div id="bottom-container">
                    <button 
                        onClick={() => {
                            navigate("/MyFeed");
                          } } >
                            Atras
                    </button>
                </div>
            </div>
        </>
    )
}

export default Profile;