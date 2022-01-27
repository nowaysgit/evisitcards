import React, {createContext, FC, useContext, useMemo, useState} from 'react';
import {Outlet, useParams} from "react-router-dom";
import ProfileInfo from "./ProfileInfo";
import Contacts from "./Contacts";
import Apps from "./Apps";
import NewButton from "./NewButton";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {Type} from "../../models/UserService";
import MenuPanel, {MenuStyles, MenuType} from "../../components/MenuPanel";
import PopUp, {EditPopUpStyles} from "./PopUp";
import PopUpStore from "../../store/PopUpStore";
import AddMenu from "./AddMenu";
import {Category} from "../../models/Service";

interface State {
    popUpStore: PopUpStore
}

const popUpStore = new PopUpStore();

export const ContextPopUp = createContext<State>({
    popUpStore
})

const Profile: FC = () => {
    let { id } = useParams();
    const {profileStore} = useContext(Context);
    const [isOpenAddMenu, setIsOpenAddMenu] = useState(false);

    function RemoveItem() {
        popUpStore.SetShowFalse();
        profileStore.DeleteUserService(popUpStore.data.data.id).then(() => console.log("Удалено!"));
    }

    function CloseAddMenu() {
        setIsOpenAddMenu(false);
    }

    useMemo(() => {
        console.log("PROFILE");
        profileStore.TryUpdateProfile(id || 0).then();
    }, []);

    if (profileStore.isLoading) {
        return (
            <div/>
         );
    }

    if (!profileStore.userInfo.userId) {
        return (
            <div>
                <h1>Пользователя не существует</h1>
                <Outlet/>
            </div>
         );
    }

    return (
        <div>
            <MenuPanel buttons={
                [
                    {
                        text: "Электронная визитка.",
                        style: MenuStyles.Logo,
                        action: () => {console.log("Электронная визитка.")}
                    },
                    {
                        text: "Настройки",
                        style: MenuStyles.EditBlue,
                        action: "/settings",
                        type: MenuType.Link
                    },
                ]}/>
            <ContextPopUp.Provider value={{
                popUpStore
            }}>
                <ProfileInfo/>
                <Contacts blockTitle="" info={profileStore.userInfo?.user_services.filter(service => service.type === Type.Contact)}/>
                {
                    (Object.values(Category) as Array<Category>).map(category =>
                        <Apps key={category} blockTitle={category} info={profileStore.userInfo?.user_services.filter(service => service.type === Type.App && service.service.category === category)}/>
                    )
                }
                <NewButton setIsOpenAddMenu={setIsOpenAddMenu}/>
                <PopUp buttons={[
                        {text: "Удалить", style: EditPopUpStyles.Red, action: () => RemoveItem() },
                        {text: "Изменить", action: () => { console.log(popUpStore.data.data) }},
                    ]}
                    showCloseButton={false}/>
                 <AddMenu isOpen={isOpenAddMenu} closeHandler={CloseAddMenu}/>
            </ContextPopUp.Provider>
            <Outlet/>
        </div>
    );
};

export default observer(Profile);