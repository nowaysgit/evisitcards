import React, {FC, useContext, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {userStore, profileStore} = useContext(Context)
    const navigate = useNavigate();

    return (
        <div>
            {userStore.isAuth ? (
                <div>
                    <h1>Вы уже авторизованны!</h1>
                    <button className="col-12" onClick={() => {
                        profileStore.TryUpdateProfile(0, true).then(() => navigate("/me"))
                    }}>Перейти в свой профиль</button>
                </div>
            ) : (
                <div className="row">
                    <input className="col-12" onChange={e => setEmail(e.target.value)} value={email} type="email"
                           placeholder="Email"/>
                    <input className="col-12" onChange={e => setPassword(e.target.value)} value={password}
                           type="password" placeholder="Password"/>
                    <button className="col-12" onClick={() => userStore.Login(email, password).then((e) => {
                        console.log("БЛЯЯЯ", e)
                        if (e) {
                            profileStore.TryUpdateProfile(0, true).then(() => navigate("/me"))
                        }
                    })}>Войти</button>
                </div>)}
        </div>
    );
};

export default observer(LoginForm);