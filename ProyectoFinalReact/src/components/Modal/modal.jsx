import React, {useState} from "react";
import { useUsers } from "../../contexts/users";
import { postData } from "../../shared/server";
import Styles from './index.module.css';

const Modal = ({ closeModal }) => {
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
        const newUser = convertToJson();

        console.log('New user: ', newUser);

        try {
            const response = await postData('http://localhost:3000/api/games', newUser);
            console.log(response.text);
            //Ver que devuelve response y ver logica de agregar usuario
            /*const addedGame = response[response.length - 1];

            if (addedGame && addedGame.id) {
                console.log('Juego agregado: ', addedGame);
                setUsers((prevUsers) => [...prevUsers, addedGame]);
            }*/

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

export default Modal;