import React, {FC, useContext, useState} from 'react';
import cl from '../../styles/ProfileInfo.scss'
import {ConvertPXToVW} from "../../utils/helpfunctions";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const ProfileInfo: FC = () => {
    const {profileStore} = useContext(Context);

    function GetSize(text: string){
        let size = 22;
        if(text?.length > 19){
            size = 18
        }
        if(text?.length > 23){
            size = 16
        }
        if(text?.length > 26){
            size = 14
        }
        return ConvertPXToVW(size)
    }

    return (
        <div className={`row g-custom ${cl.info}`}>
            { profileStore.userInfo.avatar !== null
                ? <img className={`${cl.image}`} src={"user_images/"+profileStore.userInfo.avatar} alt=""/>
                : <div className={`col-12 ${cl.image_default}`}><div className={cl.image_text}>{profileStore.userInfo.name?.substring(0, 1)}</div></div>
            }
            <h1 className={`col-12 ${cl.name}`} style={{ fontSize: GetSize(profileStore.userInfo.name)+'vw' }}>{profileStore.userInfo.name}</h1>
            <h1 className={`col-12 ${cl.description}`}>{profileStore.userInfo.description}</h1>
        </div>
    );
};

export default observer(ProfileInfo);