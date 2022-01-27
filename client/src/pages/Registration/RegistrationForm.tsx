import React, {FC, useContext, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const RegistrationForm: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [password2, setPassword2] = useState<string>('')
    const {userStore} = useContext(Context)

    return (
        <div>
            <div className="row">
                <input className="col-12" onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder="Email"/>
                <input className="col-12" onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder="Password"/>
                <input className="col-12" onChange={e => setPassword2(e.target.value)} value={password2} type="password" placeholder="Password2"/>
                <button className="col-12" onClick={() => userStore.Registration(email, password, password2)}>Зарегистрироватся</button>
            </div>
        </div>
    );
};

export default observer(RegistrationForm);