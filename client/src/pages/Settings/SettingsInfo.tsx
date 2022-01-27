import React, {FC, useContext, useState} from 'react';
import cl from '../../styles/SettingsInfo.scss'
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import InputText from "../../components/InputText";

const SettingsInfo: FC = () => {
    const {profileStore, userStore} = useContext(Context);
    const [image, setImage] = useState('')

    function setName(text: string) {
        profileStore.SetProfileEdited({...profileStore.userInfoEdited, name: text});
    }
    function setDescription(text: string) {
        profileStore.SetProfileEdited({...profileStore.userInfoEdited, description: text});
    }
    function setProfileLink(text: string) {
        profileStore.SetProfileEdited({...profileStore.userInfoEdited, profileLink: text});
    }

    return (
        <div>
            <div className={`row g-custom ${cl.info}`}>
                <div className={cl.info_container}>
                    { image !== ''
                        ? <img className={`${cl.image}`} src={image} alt=""/>
                        : <div className={`${cl.image_default}`}/>
                    }
                    <h1 className={`${cl.edit_text}`}>{"Изменить фото профиля"}</h1>
                </div>
                <InputText className={`${cl.input_block}`} title={"Имя"} type="input" setFluid={setName} value={profileStore?.userInfoEdited?.name || ''} placeholder={"Введите имя"}/>
                <InputText className={`${cl.input_block}`} title={"О себе"} type="textarea" setFluid={setDescription} value={profileStore?.userInfoEdited?.description || ''} placeholder={"Напишите что-нибудь о себе"}/>
                <InputText className={`${cl.input_block}`} mask={/[^A-Za-z0-9_]$/g} startedText="evisit.cards/" maxLength={32} title={"Адрес страницы"} type="input" setFluid={setProfileLink} value={profileStore?.userInfoEdited?.profileLink || ''} placeholder={profileStore?.userInfo?.userId.toString()}/>
            </div>
            <div className={`row g-custom`}>
                <label className={`text-center ${cl.block_title}`}>Безопасность и вход</label>
                <div className={cl.settings_block}>
                    <div className={cl.info_container}>
                        <label className={cl.title}>Электронная почта</label>
                        <button className={`${cl.title} ${cl.blue}`}>Изменить</button>
                    </div>
                    <label className={cl.title}>???????@???</label>
                    <div>
                        <label className={cl.text}>Почта используется для входа и восстановления доступа.</label>
                    </div>
                </div>
                <div className={cl.settings_block}>
                    <div className={cl.info_container} style={{marginBottom: 0}}>
                        <label className={cl.title}>Пароль</label>
                        <button className={`${cl.title} ${cl.blue}`}>Изменить</button>
                    </div>
                    <div>
                        <label className={cl.text}>Обновлен 23 дня назад.</label>
                    </div>
                </div>

                <button className={cl.exit_button}>
                    <span className={cl.text} onClick={() =>
                        { userStore.Logout().then(r => window.location.href = '/'+profileStore.userInfo.userId);}
                    }>Выйти</span>
                </button>
            </div>
        </div>
    );
};

export default observer(SettingsInfo);