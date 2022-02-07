import React, {FC, useContext, useState} from 'react';
import cl from '../../styles/AppButton.scss'
import {MakeMask} from "../../utils/helpfunctions";
import {AppProps} from "../../models/UserApp";
import {ContextPopUp} from "./Profile";
import {Type} from "../../models/App";
import {observer} from "mobx-react-lite";
import InputText from "../../components/InputText";
import {Context} from "../../index";

const AppButton: FC<AppProps> = (props) => {
    const {popUpStore} = useContext(ContextPopUp);
    const {profileStore, userStore} = useContext(Context);
    const [fluid, setFluid] = useState(props.info.url);

    function GoLink() {
        console.log("Ссылка! "+props.info.service.url+"/"+props.info.url)
    }

    async function ShowPopUp(x: number, y: number) {
        if (isEdit()) {
            popUpStore.SetData({x: x, y: y, data: {id: props.info.id, url: fluid}});
            await profileStore.SaveUserApp(props.info.id, fluid);
        }
        else if (isRemove()) {
            profileStore.DeleteUserApp(popUpStore.data.data.id).then(() => console.log("Удалено!"));
        }
        else {
            popUpStore.SetData({x: x, y: y, data: {id: props.info.id, url: props.info.url}});
            popUpStore.SetShowTrue();
        }
    }

    function isEdit(): boolean {
        return popUpStore.data?.data?.isEdit && popUpStore.data?.data?.id === props.info.id;
    }

    function isRemove(): boolean {
        return popUpStore.data?.data?.isRemove && popUpStore.data?.data?.id === props.info.id;
    }

    return (
        <div className={`col-12 ${cl.button} ${isRemove() && cl.red} ${isEdit() && cl.blue}`} id={props.info.id.toString()}>
            {
                props.info.service.type !== Type.Contact &&
                < button onClick={GoLink} className={cl.image_button}><img className={`${cl.image}`} src={'service_logo/' + props.info.service.img} alt="menu"/></button>
            }
            <button onClick={() => !isEdit() && GoLink()} className={cl.info_container}>
                <div className={isEdit() ? cl.title2 : cl.title}>{props.info.service.name}</div>
                {
                    isEdit()
                    ? <InputText className={`${cl.text2}`} inputClassName={`${cl.input}`} type="input" setFluid={setFluid} value={fluid || ''} placeholder={"введите.."}/>
                    : <div className={`${cl.text} ${cl.grey}`}>{MakeMask(props.info.url, props.info.service.mask)}</div>
                }
            </button>
            {userStore.isAuth && userStore.user.id === profileStore.userInfo.userId &&
                <button onClick={ (e) => ShowPopUp(e.clientX, e.clientY)}
                        className={cl.image_button}>
                    <img className={`${cl.image}`}
                         src={`interface_icons/${isRemove() ? "remove-ico.svg" : isEdit() ? "apply-ico.svg" : "edit-ico.svg"}`}
                         alt="menu"/>
                </button>}
        </div>
    );
};

export default observer(AppButton);