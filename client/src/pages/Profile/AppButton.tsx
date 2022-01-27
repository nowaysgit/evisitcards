import React, {FC, useContext} from 'react';
import cl from '../../styles/ContactButton.scss'
import {MakeMask} from "../../utils/helpfunctions";
import {ServiceProps} from "../../models/UserService";
import {ContextPopUp} from "./Profile";

const AppButton: FC<ServiceProps> = (props) => {
    const {popUpStore} = useContext(ContextPopUp);

    function GoLink() {
        console.log("Ссылка! "+props.info.service.url+"/"+props.info.url)
    }
    async function Edit(x: number, y: number) {
        popUpStore.SetData({x: x, y: y, data: {id: props.info.id, url: props.info.url}});
        popUpStore.SetShowTrue();
    }

    return (
        <div className={`col-12 ${cl.button}`}>
            <button onClick={GoLink} className={cl.image_button}><img className={`${cl.image}`} src={'service_logo/' + props.info.service.img} alt="menu"/></button>
            <button onClick={GoLink} className={cl.info_container}>
                <div className={cl.title}>{props.info.service.name}</div>
                <div className={`${cl.text} ${cl.grey}`}>{MakeMask(props.info.url, props.info.service.mask)}</div>
            </button>
            <button onClick={ (e) => Edit(e.clientX, e.clientY)} className={cl.image_button}><img className={`${cl.image}`} src={'interface_icons/edit-ico.svg'} alt="menu"/></button>
        </div>
    );
};

export default AppButton;