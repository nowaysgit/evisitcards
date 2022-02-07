import React, {FC} from 'react';
import cl from '../../styles/Apps.scss'
import AppButton from "./AppButton";
import {AppsProps} from "../../models/UserApp";
import {observer} from "mobx-react-lite";
import {CategoryTranslate} from "../../utils/Translator";
import {Type} from "../../models/App";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import clButton from '../../styles/AppButton.scss'

const Apps: FC<AppsProps> = (props) => {
    return (
        <div className={`row ${cl.links}`}>
            {
                props.blockTitle && props.info.length > 0 && props.info[0].service.type !== Type.Contact &&
                <div className={cl.block_title}>{CategoryTranslate[props.blockTitle]}</div>
            }
            <TransitionGroup className={cl.container}>
                {props.info && props.info.map(link =>
                    <CSSTransition timeout={500} classNames={{
                        enterActive: clButton.buttonEnterActive,
                        enter: clButton.buttonEnter,
                        exitActive: clButton.buttonExitActive,
                        exit: clButton.buttonExit
                      }} key={link.id}>
                        <AppButton info={link}/>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};

export default observer(Apps);