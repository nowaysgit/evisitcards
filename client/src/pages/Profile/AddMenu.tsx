import React, {FC, useMemo, useRef, useState} from 'react';
import { slide as Menu } from 'react-burger-menu'
import {observer} from "mobx-react-lite";
import cl from '../../styles/AddMenu.scss'

interface AddMenuProps {
    isOpen: boolean
    closeHandler: () => void
}

const AddMenu: FC<AddMenuProps> = React.memo(observer((props) => {
    const menuOverlay = useRef<HTMLDivElement>(null)

    useMemo(() => {
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

    const allApps = [
        {id: 1, name: 1, img: 'lol', category: 'media'},
        {id: 2, name: 2, img: 'lol', category: 'media'},
        {id: 3, name: 3, img: 'lol', category: 'media'},
        {id: 4, name: 4, img: 'lol', category: 'media'},
        {id: 5, name: 5, img: 'lol', category: 'music'},
        {id: 6, name: 6, img: 'lol', category: 'music'},
        {id: 7, name: 7, img: 'lol', category: 'music'},
        {id: 8, name: 8, img: 'lol', category: 'music'},
        {id: 9, name: 9, img: 'lol', category: 'requisite'},
        {id: 10, name: 10, img: 'lol', category: 'requisite'},
        {id: 11, name: 11, img: 'lol', category: 'requisite'},
        {id: 12, name: 12, img: 'lol', category: 'messenger'},
        {id: 13, name: 13, img: 'lol', category: 'messenger'},
        {id: 14, name: 14, img: 'lol', category: 'messenger'},
        {id: 15, name: 15, img: 'lol', category: 'Мессенджеры'},
        {id: 16, name: 16, img: 'lol', category: 'Мессенджеры'},
        {id: 17, name: 17, img: 'lol', category: 'Мессенджеры'},
        {id: 18, name: 18, img: 'lol', category: 'Мессенджеры'},
        {id: 19, name: 19, img: 'lol', category: 'Мессенджеры'},
        {id: 20, name: 20, img: 'lol', category: 'Мессенджеры'},
    ]

    function GoLink() {
        console.log("Ссылка!")
    }

    console.log("AddMenu");
    return (
        <div ref={menuOverlay} className={cl.overlay} onClick={props.closeHandler}>
            <div className={cl.menu}>
                <div className={cl.block_title}>{"Мессенджеры"}</div>
                <div className={cl.app_buttons}>
                    {allApps.map(app =>
                        <div onClick={GoLink} key={app.id} className={cl.app_button}>
                            <div className={cl.image_button}><img className={`${cl.image}`} src={'interface_icons/edit-ico.svg'} alt="menu"/></div>
                            <label className={cl.text}>{app.name}</label>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}));

export default AddMenu;