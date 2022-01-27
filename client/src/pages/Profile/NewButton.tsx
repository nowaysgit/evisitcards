import React, {FC} from 'react';
import cl from '../../styles/NewButtonn.scss'

interface NewButtonProps {
    setIsOpenAddMenu: (bool: boolean) => void
}

const NewButton: FC<NewButtonProps> = (props) => {

    return (
        <div>
            <button onClick={() => props.setIsOpenAddMenu(true)} className={`col-12 ${cl.button}`}>
                <div className={cl.image_button}><img className={`${cl.image}`} src={'interface_icons/add-ico.svg'} alt="menu"/></div>
            </button>
        </div>
    );
};

export default NewButton;