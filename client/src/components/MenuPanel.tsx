import React, {FC} from 'react';
import cl from '../styles/MenuPanel.scss'
import {Link} from "react-router-dom";

export enum MenuStyles {
    EditWhite = "edit_white",
    EditBlue = "edit_blue",
    Logo = "logo",
    LogoLarge = "logo_large"
}

export enum MenuType {
    Link = "link",
    Action = "action"
}

export interface MenuButtonProp {
    text: string,
    style: MenuStyles,
    action: any
}

export interface MenuProps {
    buttons: MenuButtonProp[]
}

const MenuPanel: FC<MenuProps> = (props) => {
    return (
        <div className={cl.menu_panel}>
            {props.buttons.map(button =>
                typeof button.action === "function" ? (
                    <button key={button.text}
                        className={`${cl.menu_button} ${cl[button.style]}`}
                        onClick={button.action}>{button.text}</button>
                ) :(
                    <Link key={button.text}
                            className={`${cl.menu_button} ${cl[button.style]}`}
                            to={button.action}>{button.text === "MyInf" ? (<label><span className={cl.blue_text}>My</span>Inf</label>) : (button.text)}</Link>
                )
            )}
        </div>
    );
};

export default MenuPanel;