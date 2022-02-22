import React, {FC, useContext, useMemo} from 'react';
import {Outlet, Navigate, useNavigate} from "react-router-dom";
import {Context} from "../../index";
import MenuPanel, {MenuStyles} from "../../components/MenuPanel";
import SettingsInfo from "./SettingsInfo";
import {observer} from "mobx-react-lite";

const Settings: FC = () => {
    const {profileStore, userStore} = useContext(Context);
    const navigate = useNavigate();

    useMemo(() => {
        console.log("SETTINGS")
        if(!profileStore.userInfo || !profileStore.userInfo.userId || profileStore.userInfo.userId != userStore.user.id) {
            profileStore.TryUpdateProfile(0, true).then();
            profileStore.SetProfileEdited(profileStore.userInfo);
        }
        if(!profileStore.userInfoEdited.userId) {
            profileStore.SetProfileEdited(profileStore.userInfo);
        }
    }, []);

    if (profileStore.isLoading) {
        return (
            <div/>
         );
    }

    if (!userStore.isAuth)
    {
        return (
            <Navigate to="/login" replace={true}/>
        );
    }

    if (!profileStore.userInfo.userId) {
        return (
            <Navigate to="/login" replace={true}/>
         );
    }

    return (
        <div>
            <MenuPanel buttons={
                [
                    {
                        text: "Отмена",
                        style: MenuStyles.EditWhite,
                        action: () => { profileStore.Cansel().then(() => navigate(-1)); }
                    },
                    {
                        text: "Настройки",
                        style: MenuStyles.LogoLarge,
                        action: () => {}
                    },
                    {
                        text: "Готово",
                        style: MenuStyles.EditBlue,
                        action: () => { profileStore.Save().then(() => navigate(-1)); }
                    }
                ]}/>
            <SettingsInfo/>
            <Outlet/>
        </div>
    );
};

export default observer(Settings);