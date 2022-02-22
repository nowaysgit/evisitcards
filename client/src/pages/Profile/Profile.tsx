import React, {createContext, FC, useContext, useMemo, useState} from 'react';
import {Outlet, useParams} from "react-router-dom";
import ProfileInfo from "./ProfileInfo";
import Apps from "./Apps";
import NewButton from "./NewButton";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import MenuPanel, {MenuStyles, MenuType} from "../../components/MenuPanel";
import PopUp, {EditPopUpStyles} from "./PopUp";
import PopUpStore from "../../store/PopUpStore";
import AddMenu from "./AddMenu";
import {Category} from "../../models/App";
import vCard from 'vcf';
import {MakeContact} from "../../utils/ContactMaker";

interface State {
    popUpStore: PopUpStore
}

const popUpStore = new PopUpStore();

export const ContextPopUp = createContext<State>({
    popUpStore
})

const Profile: FC = () => {
    let { id } = useParams();
    const {profileStore, userStore} = useContext(Context);
    const [isOpenAddMenu, setIsOpenAddMenu] = useState(false);

    function RemoveItem() {
        popUpStore.SetShowFalse();
        popUpStore.SetData({...popUpStore.data, data: {...popUpStore.data.data, isRemove: true}});
    }

    function EditItem() {
        popUpStore.SetData({...popUpStore.data, data: {...popUpStore.data.data, isEdit: true}});
        popUpStore.SetShowFalse();
    }

    function CloseAddMenu() {
        setIsOpenAddMenu(false);
    }

    async function AddToContact() {
        console.log("AddToContact");
        const element = document.createElement("a");
        const card = await MakeContact(profileStore.userInfo);
        const vcf = card.toString('4.0');
        const file = new Blob([vcf], {
            type: "text/vcard"
        });
        element.href = URL.createObjectURL(file);
        element.download = "myinf.vcf";
        document.body.appendChild(element);
        element.click();
    }

    function IsEdited (){
        return userStore.isAuth && userStore.user.id === profileStore.userInfo.userId
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
                        text: "MyInf",
                        style: MenuStyles.Logo,
                        action:  "/"
                    },
                    {
                        text: IsEdited() ? "Настройки" : "Добавить в контакты",
                        style: MenuStyles.EditBlue,
                        action: IsEdited() ? "/settings" : () => AddToContact()
                    },
                ]}/>
            <ContextPopUp.Provider value={{
                popUpStore
            }}>
                <ProfileInfo/>
                {
                    (Object.values(Category) as Array<Category>).map(category =>
                        profileStore.userInfo?.user_services.filter(service => service.service.category === category).length > 0 &&
                        <Apps key={category} blockTitle={category} info={profileStore.userInfo?.user_services.filter(service => service.service.category === category)}/>
                    )
                }
                {
                    IsEdited() &&
                    <NewButton setIsOpenAddMenu={setIsOpenAddMenu}/>
                }
                <PopUp buttons={[
                        {text: "Удалить", style: EditPopUpStyles.Red, action: () => RemoveItem() },
                        {text: "Изменить", action: () =>  EditItem()},
                    ]}
                    showCloseButton={false}/>
                {
                    IsEdited() &&
                    <AddMenu isOpen={isOpenAddMenu} closeHandler={CloseAddMenu}/>
                }
            </ContextPopUp.Provider>
            <Outlet/>
        </div>
    );
};

export default observer(Profile);