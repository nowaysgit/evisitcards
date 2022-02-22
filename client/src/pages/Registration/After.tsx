import React, {FC} from 'react';
import {observer} from "mobx-react-lite";
import cl from "../../styles/LoginForm.scss";
import PopUpStore from "../../store/PopUpStore";
import {useNavigate} from "react-router-dom";

interface AfterProps {
    email: string
}

const After: FC<AfterProps> = (props) => {
    const navigate = useNavigate();

    return (
        <div className={cl.main}>
            <div className={cl.block}>
                <div className={cl.menu}>
                    <h1 className={cl.title}><span className={cl.blue_text}>My</span>Info</h1>
                </div>
                <label className={cl.description}>Проверьте почту!</label>
                <label className={cl.description}>Для завершения регистрации перейдите по ссылке в письме, которое мы отправили на указанную вами почту ({props.email}).</label>
            </div>

                <div className={cl.block}>
                    <button className={`${cl.button} ${cl.blue_background}`} onClick={() => navigate('/')}>На главную
                    </button>
                </div>
        </div>
    )
};

export default observer(After);