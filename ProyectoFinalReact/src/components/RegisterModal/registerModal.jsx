import React, {useState} from "react";
import { useUsers } from "../../contexts/users";
import { postDataApplicationJson } from "../../shared/server";
import Styles from './index.module.css';

const RegisterModal = ({ closeModal }) => {
    const { setUsers } = useUsers();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const convertToJson = () => {
        return {
            username,
            password,
            email
        }
    }

    const handleAddUser = async (event) => {
        event.preventDefault();
        const newUser = JSON.stringify(convertToJson());

        console.log('New user: ', newUser);

        try {
            const { response, result } = await postDataApplicationJson('http://localhost:3001/api/auth/register', newUser);
            console.log(response);
            console.log(result);
            closeModal();
        } catch(error) {
            console.error("Error: ", error);
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
                            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                    </div>

                    <div>
                        <label>Password</label>
                        <div>
                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>

                    <div>
                        <label>Email</label>
                        <div>
                            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>

                    <div className={Styles.buttons}>
                        <button type="submit" className={Styles.modalButton}>Register</button>
                        <button onClick={closeModal} className={`${Styles.modalButton} ${Styles.cancelButton}`}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterModal;