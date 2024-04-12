import React from "react";
import {getClasses} from "@/utils/getClasses";
import styles from '@/styles/modules/button.module.scss';

type Variant = {
    primary?: string,
    secondary?: string
}

type buttonProps = {
    type: string
    variant?: Variant,
    children: React.ReactNode
}

type selectButtonProps = {
    selectButtonId: string
    value?:string,
    children?: React.ReactNode,
}
export const Button: React.FC<buttonProps> = ({type, variant = 'primary', children, ...rest}) => {
    return (
        <button type={type === 'submit' ? 'submit' : 'button'}
                className={getClasses([styles.button, styles[`button--${variant}`]])}
                {...rest}
        >
            {children}
        </button>)
};

export const SelectButton: React.FC<selectButtonProps> = ({selectButtonId, children, ...rest}) => {
    return (
        <select
            id={selectButtonId}
            className={getClasses([styles.button, styles.button__select])}
            {...rest}
        >
            {children}
        </select>
    )
}