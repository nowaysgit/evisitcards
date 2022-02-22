import React, {FC, useContext, useEffect, useMemo, useState} from 'react';
import cl from '../../styles/SettingsInfo.scss'
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import InputText from "../../components/InputText";
import Block from "./Block";
import {ErrorsResponse} from "../../models/response/ErrorsResponse";
import {DeclOfNum, ToBase64} from "../../utils/helpfunctions";
import {useNavigate} from "react-router-dom";

const SettingsInfo: FC = () => {
    const {profileStore, userStore} = useContext(Context);
    const [days, setDays] = useState<number>(1)
    const [newAvatar64, setNewAvatar64] = useState<string>('')
    const navigate = useNavigate();

    function setName(text: string) {
        profileStore.SetProfileEdited({...profileStore.userInfoEdited, name: text});
    }

    function setDescription(text: string) {
        profileStore.SetProfileEdited({...profileStore.userInfoEdited, description: text});
    }

    function setProfileLink(text: string) {
        profileStore.SetProfileEdited({...profileStore.userInfoEdited, profileLink: text});
    }

    async function setNewPassword(text: string): Promise<ErrorsResponse[] | null> {
        return await userStore.UpdatePassword(text);
    }

    async function setNewEmail(text: string): Promise<ErrorsResponse[] | null> {
        return await userStore.UpdateEmail(text);
    }

    async function setAvatar(event: any) {
        profileStore.SetNewAvatar(event.target.files[0]);
    }

    useMemo(() => {
        const days = ((((Date.now() - Date.parse(userStore.user.passwordLastUpdate)) / 1000) / 60) / 60) / 24;
        if (days < 1) setDays(1);
        else setDays(Math.floor(days));
    }, [])

    useEffect(() => {
        if(!profileStore.newAvatar) return;
        // @ts-ignore
        ToBase64(profileStore.newAvatar).then(result => {
            if(result) { // @ts-ignore
                setNewAvatar64(result);
            }
        })
    }, [profileStore.newAvatar])


    return (
        <div>
            <div className={`row g-custom ${cl.info}`}>
                <div className={cl.info_container}>
                    {
                        profileStore.newAvatar !== null
                            ? <img className={`${cl.image}`} src={newAvatar64}
                                   alt=""/>
                            : profileStore.userInfo.avatar !== null
                                ? <img className={`${cl.image}`} src={"user_images/" + profileStore.userInfo.avatar}
                                       alt=""/>
                                : <div className={`${cl.image_default}`}/>

                    }
                    <label htmlFor={cl.upload_avatar}>Изменить фото профиля</label>
                    <input name="avatar" id={cl.upload_avatar} type={"file"} accept="image/*" onChange={setAvatar}/>
                </div>
                <InputText className={`${cl.input_block}`} title={"Имя"} type="input" setFluid={setName}
                           value={profileStore?.userInfoEdited?.name || ''} placeholder={"Введите имя"}/>
                <InputText className={`${cl.input_block}`} title={"О себе"} type="textarea" setFluid={setDescription}
                           value={profileStore?.userInfoEdited?.description || ''}
                           placeholder={"Напишите что-нибудь о себе"}/>
                <InputText className={`${cl.input_block}`} mask={/[^A-Za-z0-9_]$/g} startedText="evisit.cards/"
                           maxLength={32} title={"Адрес страницы"} type="input" setFluid={setProfileLink}
                           value={profileStore?.userInfoEdited?.profileLink || ''}
                           placeholder={profileStore?.userInfo?.userId.toString()}/>
            </div>
            <div className={`row g-custom`}>
                <label className={`text-center ${cl.block_title}`}>Безопасность и вход</label>
                <Block valueType={'email'} setFluid={setNewEmail} placeholder={userStore.user.email}
                       title={"Электронная почта"}
                       description={"Почта используется для входа и восстановления доступа."}/>
                <Block valueType={'password'} setFluid={setNewPassword} placeholder={"введите пароль"} title={"Пароль"}
                       description={`Обновлен ${days} ${DeclOfNum(days, ['день', 'дня', 'дней'])} назад.`}/>

                <button className={cl.exit_button}>
                    <span className={cl.text} onClick={() =>
                        userStore.Logout().then((r) => navigate(`/${profileStore.userInfo.userId}`))
                    }>Выйти</span>
                </button>
            </div>
        </div>
    );
};

export default observer(SettingsInfo);