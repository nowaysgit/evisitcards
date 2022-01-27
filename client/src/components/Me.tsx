import React, {FC, useContext, useMemo} from 'react';
import {Navigate} from "react-router-dom";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {IsUndefined} from "../utils/helpfunctions";

const Me: FC = () => {
    const {profileStore, userStore} = useContext(Context);

    useMemo((): any => {
        console.log("ME");
        if( !profileStore.userInfo ||
            (IsUndefined(profileStore.userInfo.userId) && IsUndefined(userStore.user.id)) ||
            ((!IsUndefined(profileStore.userInfo.userId) && !IsUndefined(userStore.user.id)) &&
            profileStore.userInfo.userId != userStore.user.id)) {
            profileStore.TryUpdateProfile(0, true).then();
        }
    }, []);

    if (profileStore.isLoading) {
        return (
            <div/>
         );
    }

    if (!profileStore.userInfo.userId) {
        return (
            <Navigate to="/login"/>
         );
    }

    return (
        <Navigate to={"/" + profileStore.userInfo.profileLink || profileStore.userInfo.userId.toString()}/>
     );
};

export default observer(Me);