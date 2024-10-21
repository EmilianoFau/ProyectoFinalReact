import React, {useState} from "react";
import { useUsers } from "../../contexts/users";
import { postData } from "../../shared/server";
import Styles from './index.module.css';

const Modal = ({ closeModal }) => {
    const { setUsers } = useUsers();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [usernameEmpty, setUsernameEmpty] = useState(false);
    const [passwordEmpty, setPasswordEmpty] = useState(false);
    const [emailEmpty, setEmailEmpty] = useState(false);
    const [userExists, setUserExists] = useState(false);

    const convertToJson = () => {
        return {
            username,
            password,
            email
        }
    }

    const handleAddUser = async (event) => {
        event.preventDefault();
        const newUser = convertToJson();

        console.log('New user: ', newUser);
        setUserExists(false);
        if (username == '' || password == '' || email == '') {
            username == '' ? setUsernameEmpty(true) : setUsernameEmpty(false);
            password == '' ? setPasswordEmpty(true) : setPasswordEmpty(false);
            email == '' ? setEmailEmpty(true) : setEmailEmpty(false);
        } else {
            setUsernameEmpty(false);
            setPasswordEmpty(false);
            setEmailEmpty(false);
            setUserExists(false);
            try {
                const { response, result } = await postData('http://localhost:3001/api/auth/register', newUser);
                console.log(response);
                console.log(result);
                if (response.status == 400) {
                    setUserExists(true);
                } else {
                    closeModal();
                }
            } catch(error) {
                console.error("Error: ", error);
            }
        }

        
    }

    return (
        <div className={Styles.overlay}>
            <div className={Styles.modal}>
                <h2 className={Styles.title}>Register</h2>
                <form onSubmit={handleAddUser}>
                    <div>
                        <label>Username</label>
                        <div>
                            <input className={usernameEmpty ? Styles.emptyField : null} type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                    </div>

                    <div>
                        <label>Password</label>
                        <div>
                            <input className={passwordEmpty ? Styles.emptyField : null} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>

                    <div>
                        <label>Email</label>
                        <div>
                            <input className={emailEmpty ? Styles.emptyField : null} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>

                    <div className={Styles.alert}>{userExists ? `That email is already registered` : null}</div>

                    <div className={Styles.buttons}>
                        <button type="submit" className={Styles.modalButton}>Register</button>
                        <button onClick={closeModal} className={`${Styles.modalButton} ${Styles.cancelButton}`}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Modal;