import React, {FC} from 'react';
import {ServicesProps} from 'src/models/UserService';
import cl from '../../styles/Contacts.scss'
import ContactButton from "./ContactButton";
import {observer} from "mobx-react-lite";

const Contacts: FC<ServicesProps> = (props) => {
    return (
        <div className={`row d-flex justify-content-center ${cl.infos}`}>
            {props.info && props.info.map(link =>
                <ContactButton info={link} key={link.id}/>
            )}
        </div>
    );
};

export default observer(Contacts);