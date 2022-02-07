import React, {FC, useContext, useEffect, useMemo, useRef, useState} from 'react';
import { slide as Menu } from 'react-burger-menu'
import {observer} from "mobx-react-lite";
import cl from '../../styles/AddMenu.scss'
import {Category, LinksImage, Mask, Type} from "../../models/App";
import {CategoryTranslate} from "../../utils/Translator";
import {Context} from "../../index";
import {UserApp} from "../../models/UserApp";
import {ContextPopUp} from "./Profile";

interface AddMenuProps {
    isOpen: boolean
    closeHandler: () => void
}

interface ServiceInterfaceDEBUG {
    id: number,
    name: string,
    img: LinksImage,
    category: Category,
    mask: Mask,
    type: Type
}

const AddMenu: FC<AddMenuProps> = React.memo(observer((props) => {
    const menuOverlay = useRef<HTMLDivElement>(null)
    const {profileStore} = useContext(Context);
    const {popUpStore} = useContext(ContextPopUp);

    const allApps: ServiceInterfaceDEBUG[] = [
        {id: 1, name: 'Телефон', img: LinksImage.Telephone, category: Category.Basic, mask: Mask.PhoneNumber, type: Type.Contact},
        {id: 2, name: 'Почта', img: LinksImage.Mail, category: Category.Basic, mask: Mask.At, type: Type.Contact},
        {id: 3, name: 'Сайт', img: LinksImage.Site, category: Category.Basic, mask: Mask.Link, type: Type.Contact},
        {id: 4, name: 'Telegram', img: LinksImage.Telegram, category: Category.Messenger, mask: Mask.At, type: Type.App},
        {id: 5, name: 'WhatsApp', img: LinksImage.WhatsApp, category: Category.Messenger, mask: Mask.PhoneNumber, type: Type.App},
        {id: 6, name: 'Viber', img: LinksImage.Viber, category: Category.Messenger, mask: Mask.At, type: Type.App},
        {id: 7, name: 'Discord', img: LinksImage.Discord, category: Category.Messenger, mask: Mask.At, type: Type.App},
        {id: 8, name: 'Instagram', img: LinksImage.Instagram, category: Category.SocialNetwork, mask: Mask.At, type: Type.App},
        {id: 9, name: 'ВКонтакте', img: LinksImage.Vk, category: Category.SocialNetwork, mask: Mask.At, type: Type.App},
        {id: 10, name: 'Одноклассники', img: LinksImage.Ok, category: Category.SocialNetwork, mask: Mask.At, type: Type.App},
        {id: 11, name: 'Tik-Tok', img: LinksImage.Tiktok, category: Category.SocialNetwork, mask: Mask.At, type: Type.App},
        {id: 12, name: 'Twitter', img: LinksImage.Twitter, category: Category.SocialNetwork, mask: Mask.At, type: Type.App},
        {id: 13, name: 'Facebook', img: LinksImage.Facebook, category: Category.SocialNetwork, mask: Mask.At, type: Type.App},
        {id: 14, name: 'Snapchat', img: LinksImage.Snapchat, category: Category.SocialNetwork, mask: Mask.At, type: Type.App},
        {id: 15, name: 'Сбербанк', img: LinksImage.Sberbank, category: Category.Requisite, mask: Mask.PhoneNumber, type: Type.App},
        {id: 16, name: 'Тинькофф', img: LinksImage.Tinkoff, category: Category.Requisite, mask: Mask.PhoneNumber, type: Type.App},
        {id: 17, name: 'Ю Money', img: LinksImage.Umoney, category: Category.Requisite, mask: Mask.PhoneNumber, type: Type.App},
        {id: 18, name: 'Behance', img: LinksImage.Behance, category: Category.Media, mask: Mask.Link, type: Type.App},
        {id: 19, name: 'Dribbble', img: LinksImage.Dribbble, category: Category.Media, mask: Mask.Link, type: Type.App},
        {id: 20, name: 'Twitch', img: LinksImage.Twitch, category: Category.Media, mask: Mask.Link, type: Type.App},
        {id: 21, name: 'YouTube', img: LinksImage.YouTube, category: Category.Media, mask: Mask.Link, type: Type.App},
        {id: 22, name: 'Яндекс.Музыка', img: LinksImage.YandexMusic, category: Category.Music, mask: Mask.Link, type: Type.App},
        {id: 23, name: 'Spotify', img: LinksImage.Spotify, category: Category.Music, mask: Mask.Link, type: Type.App},
        {id: 24, name: 'Apple Music', img: LinksImage.AppleMusic, category: Category.Music, mask: Mask.Link, type: Type.App},
        {id: 25, name: 'Soundcloud', img: LinksImage.Soundcloud, category: Category.Music, mask: Mask.Link, type: Type.App}
    ]
    const [Apps, setApps] = useState<ServiceInterfaceDEBUG[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useMemo(() => {
        console.log("ADD useMemo")
        let userServices: ServiceInterfaceDEBUG[] = [];
        for(const user_service of profileStore.userInfo.user_services) {
            userServices.push(user_service.service);
        }
        const newApps: Set<ServiceInterfaceDEBUG> = new Set([...allApps].filter((x) =>
            !userServices.find((element) => {
                return x.id === element.id;
            })))
        setApps(Array.from(newApps));
    }, [profileStore.userInfo.user_services]);

    useEffect(() => {
        if (!isLoaded) {
            setIsLoaded(true);
            return;
        }
        console.log("ADD useEffect")
        if(menuOverlay?.current?.style) {
            menuOverlay.current.style.visibility = props.isOpen ? 'visible' : 'hidden'
        }
        const root = document.body;
        const footer = document.getElementById('FOOTER');
        if (root) {
            root.style.overflow = props.isOpen ? 'hidden': '';
            root.style.position = props.isOpen ? 'fixed': '';
            root.style.bottom = props.isOpen ? '6.5vw': '';
            if  (!props.isOpen && footer) {
                document.documentElement.scrollTop = 10000;
            }
        }
    }, [props.isOpen]);

    function GoLink(id: number) {
        const NewService: UserApp = {id: -1, url: '', userInfoId: -1, service: allApps.filter(x=> x.id === id)[0] }
        profileStore.CreateUserApp(NewService).then((newId) => {
            popUpStore.SetData( { ...popUpStore.data, data: {id: newId, isEdit: true}});
        });
    }

    console.log("AddMenu");
    return (
        <div ref={menuOverlay} className={cl.overlay} onClick={props.closeHandler}>
            <div className={cl.menu}>
                {
                    (Object.values(Category) as Array<Category>).map(category =>
                        <div key={category}>
                            {
                                [...Apps].filter(service => service.category === category).length > 0 &&
                                <div className={cl.block_title}>{CategoryTranslate[category]}</div>
                            }
                            <div className={cl.app_buttons}>
                                {[...Apps].filter(service => service.category === category).map(app =>
                                    <div onClick={() => GoLink(app.id)} key={app.id} className={cl.app_button}>
                                        <div className={cl.image_button}><img className={`${cl.image}`} src={'service_logo/'+ app.img} alt="menu"/></div>
                                        <label className={cl.text}>{app.name}</label>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}));

export default AddMenu;