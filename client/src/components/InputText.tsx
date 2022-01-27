import React, {FC} from 'react';
import cl from '../styles/InputText.scss'
import TextareaAutosize from 'react-textarea-autosize';
import InputMask from "react-input-mask";

export interface InputProps {
    title: string
    placeholder: string
    setFluid: any
    value: any
    type: string
    mask?: RegExp
    startedText?: string
    maxLength?: number
    className?: string
}

const InputText: FC<InputProps> = (props) => {

    function ModifyInputText (text: string) {
        if (props.mask) {
            text = text.replace(props.mask as RegExp, '');
        }
        props.setFluid(text)
    }

    return (
        <div className={`${cl.container} ${props.className}`}>
            <div className={cl.title}>{props.title}</div>
            {props.type === "textarea" ? (
                    <TextareaAutosize maxRows={20} className={cl.input} value={props.value}
                                      onChange={(e) => props.setFluid(e.target.value)}
                                      placeholder={props.placeholder}
                    />
                )
                : (
                    <label className={cl.input_wrp}>
                        <input style={{paddingLeft: `${3.2+((props.startedText?.length || 0)*1.6)}vw`}}
                               maxLength={props.maxLength}
                               spellCheck={false}
                               className={cl.input}
                               type={"text"}
                               value={props.value}
                               onChange={(e) =>
                                    {
                                        ModifyInputText(e.target.value);
                                    }

                                }
                               placeholder={props.placeholder}/>
                        <div className={cl.input_wrp_text}>{props.startedText}</div>
                    </label>)}
        </div>
    );
};

export default InputText;