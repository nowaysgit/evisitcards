import React, {FC, useContext} from 'react';
import cl from "../../styles/Home.scss";
import {useNavigate} from "react-router-dom";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const Home: FC = () => {
    const navigate = useNavigate();
    const {userStore, profileStore} = useContext(Context);

    return (
        <div className={cl.main}>
            <div className={cl.block}>
                <h1 className={cl.title}><span className={cl.blue_text}>My</span>Info</h1>
                <label className={cl.description}>Твоя электронная визитка</label>
            </div>
            {userStore.isAuth ? (
                <div className={cl.block}>
                    <button className={`${cl.button} ${cl.blue_background}`} onClick={() => {
                        profileStore.TryUpdateProfile(0, true).then(() => {
                            navigate("/me", {replace: true})
                        })
                    }}>Перейти в свой профиль
                    </button>
                </div>
            ) : (
            <div className={cl.block}>
                <button className={`${cl.button} ${cl.blue_background}`} onClick={() => navigate("/login", {replace: false})}>Войти</button>
                <button className={`${cl.button} ${cl.gray_background}`} onClick={() => navigate("/registration", {replace: false})}>Регистрация</button>
            </div>)}
        </div>
    );
};

export default observer(Home);