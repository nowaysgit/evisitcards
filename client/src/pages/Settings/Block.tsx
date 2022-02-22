import React, {FC, useState} from 'react';
import cl from '../../styles/SettingsInfo.scss'
import {observer} from "mobx-react-lite";
import InputText from "../../components/InputText";
import {ErrorsResponse} from "../../models/response/ErrorsResponse";

export interface BlockProps {
    title: string
    description: string
    placeholder: string
    setFluid: (value: string) => Promise<ErrorsResponse[] | null>
    valueType: string
}

const SettingsInfo: FC<BlockProps> = (props) => {
    const [isEdit, setIsEdit] = useState(false)
    const [fluid, setFluid] = useState('')
    const [errors, setErrors] = useState<ErrorsResponse[]>([]);

    async function Update(value: string): Promise<ErrorsResponse[] | null> {
        setFluid(value);
        return await props.setFluid(value);
    }

    return (
        <div className={cl.settings_block}>
            <div className={cl.info_container} style={{marginBottom: 0}}>
                <label className={cl.title}>{props.title}</label>
                <button className={`${cl.title} ${isEdit ? cl.save : cl.blue}`} onClick={ async () => {
                    setIsEdit(true);
                    if (isEdit) {
                        const newErrors = await Update(fluid);
                        if (!newErrors) {
                            setIsEdit(false);
                            setErrors([]);
                            return;
                        }
                        if (newErrors.length === undefined) {
                            setIsEdit(false);
                        } else {
                            setErrors(newErrors);
                        }
                    }
                }}>{isEdit ? "Сохранить" : "Изменить"}</button>
                {isEdit &&<button className={`${cl.title} ${cl.blue}`} onClick={() => {
                    setIsEdit(false);
                    setErrors([]);
                }}>Отменить</button> }
            </div>
            <div>
                {   isEdit
                    ? <InputText valueType={props.valueType} className={cl.text_input} type="input" setFluid={setFluid} value={fluid} placeholder={props.placeholder}/>
                    : <label className={cl.text}>{props.description}</label>
                }
                {errors.length > 0 && errors.map((error) =>
                    (<label key={error.msg} className={`${cl.text} ${cl.red}`}>{error.msg}</label>)
                )}
            </div>
        </div>
    );
};

export default observer(SettingsInfo);