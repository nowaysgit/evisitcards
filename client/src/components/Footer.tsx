import React, {FC} from 'react';
import cl from '../styles/Footer.scss'

const Footer: FC<React.HTMLAttributes<HTMLElement>> = (props) => {
    return (
        <div style={props.style} className={cl.footer} id={'FOOTER'}>
            {props.children}
        </div>
    );
};

export default Footer;