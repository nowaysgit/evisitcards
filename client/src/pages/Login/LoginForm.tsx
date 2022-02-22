import React, {FC, useContext, useEffect, useRef, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import cl from "../../styles/LoginForm.scss";
import {ErrorsResponse} from "../../models/response/ErrorsResponse";

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {userStore, profileStore} = useContext(Context);
    const navigate = useNavigate();
    const emailInput = useRef<HTMLElement>(null);
    const passwordInput = useRef<HTMLElement>(null);
    const [isRendered, setIsRendered] = useState<boolean>(false);
    const [errors, setErrors] = useState<ErrorsResponse[]>([]);

    function validate(ref: React.RefObject<HTMLElement>, value: string, length: number, msg: string, param: string): boolean {
        if(ref.current) {
            if(value.length < length) {
                ref.current.style.borderColor = '#EF5143'
                if(!errors.find(x => x.msg === msg)) {
                    setErrors([...errors, {value: value, msg: msg, param: param, location: "body"}]);
                    return false;
                }
            } else {
                ref.current.style.borderColor = ''
                setErrors(errors.filter(x => x.msg !== msg));
                return true;
            }
        }
        return false;
    }
    useEffect(()=> {
        if(!isRendered) {
            setIsRendered(true);
            return;
        }
        validate(emailInput, email, 1, "Заполните поле эл. почта", "email");
    }, [email]);
    useEffect(()=> {
        if(!isRendered) return;
        validate(passwordInput, password, 1, "Заполните поле пароль", "password");
    }, [password]);

    function login () {
        userStore.Login(email, password).then((e) => {
                if (e) {
                    console.log(e)
                    let newErrors = []
                    for(const er of e) {
                        if (er.param === "email") {
                            if(er.msg === "Неверный формат эл. почты" && e.find(x => x.msg === "Заполните поле эл. почта")) continue;
                            validate(emailInput, email, 6, "Заполните поле эл. почта", "email");
                        }
                        if (er.param === "password") {
                            validate(passwordInput, password, 6, "Заполните поле пароль", "password");
                        }
                        newErrors.push(er);
                    }
                    setErrors(newErrors);
                } else {
                    profileStore.TryUpdateProfile(0, true).then((b) => {
                        navigate("/me", {replace: true})
                    })
                }
            }
        );
    }

    // @ts-ignore
    return (
        <div className={cl.main}>
            <div className={cl.block}>
                <div className={cl.menu}>
                    <button className={cl.back} onClick={() => navigate("/")}>
                        <img src="interface_icons/back-ico.svg" alt="back"/>
                    </button>
                    <h1 className={cl.title}><span className={cl.blue_text}>My</span>Info</h1>
                </div>
                <label className={cl.description}>Авторизация</label>
                {userStore.isAuth && (<label className={cl.description}>Вы уже авторизованны!</label>)}
            </div>
            {userStore.isAuth ? (
                <div className={cl.block}>
                    <button className={`${cl.button} ${cl.blue_background}`} onClick={() => {
                        profileStore.TryUpdateProfile(0, true).then((b) => {
                            if (b) {
                                navigate("/me", {replace: true})
                            }
                        })
                    }}>Перейти в свой профиль
                    </button>
                </div>
            ) : (
                <div className={cl.block}>
                    {//@ts-ignore
                    <input ref={emailInput} className={cl.input} onChange={e => setEmail(e.target.value)} value={email} type="email"
                           placeholder="Email"/>
                    }
                    {//@ts-ignore
                    <input ref={passwordInput} className={cl.input} onChange={e => setPassword(e.target.value)} value={password}
                           type="password" placeholder="Password"/>
                    }
                    <button className={`${cl.button} ${cl.blue_background}`}
                            onClick={login}>Войти
                    </button>
                    <div className={cl.errors}>
                        {errors.map((error) => (<label className={cl.error} key={error.msg}>{error.msg}</label>))}
                    </div>
                </div>)
            }
        </div>
    );
};

export default observer(LoginForm);