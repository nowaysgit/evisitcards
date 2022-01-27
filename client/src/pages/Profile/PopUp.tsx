import React, {FC, useContext} from 'react';
import cl from '../../styles/PopUp.scss'
import Modal from 'react-modal';
import {ContextPopUp} from "./Profile";
import {observer} from "mobx-react-lite";

export enum EditPopUpStyles {
    Red = "red",
    None = "",
}

export interface EditPopUpButtonProp {
    text: string
    style?: EditPopUpStyles
    action: () => void
}

export interface EditPopUpProps {
    buttons: EditPopUpButtonProp[]
    showCloseButton: boolean
}

const PopUp: FC<EditPopUpProps> = (props) => {
    Modal.setAppElement('#root');
    const {popUpStore} = useContext(ContextPopUp);

    return (
        <Modal  isOpen={popUpStore.show}
                onRequestClose={popUpStore.SetShowFalse}
                shouldCloseOnOverlayClick={true}
                className={cl.popup}
                overlayClassName={cl.overlay}
                id={'MODAL'}>

            {props.buttons.map(button =>
            <div key={button.text}>
                <button onClick={button.action} className={`${cl.text} ${button.style && cl[button.style]}`}>{button.text}</button>
                <hr/>
            </div>
            )}
            {props.showCloseButton && (<button onClick={popUpStore.SetShowFalse} className={`${cl.text}`}>Отмена</button>)}
        </Modal>
    );
};

export default observer(PopUp);