import React, {FC} from 'react';
import cl from '../../styles/Apps.scss'
import AppButton from "./AppButton";
import {ServicesProps} from "../../models/UserService";
import {observer} from "mobx-react-lite";
import {CategoryTranslate} from "../../utils/Translator";

const Apps: FC<ServicesProps> = (props) => {
    return (
        <div className={`row ${cl.links}`}>
            {
                props.blockTitle && props.info.length > 0 &&
                <div className={cl.block_title}>{CategoryTranslate[props.blockTitle]}</div>
            }
            {props.info && props.info.map(link =>
                <AppButton info={link} key={link.id}/>
            )}
        </div>
    );
};

export default observer(Apps);