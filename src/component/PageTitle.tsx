import React from "react";
import styles from '@/styles/modules/title.module.scss';

export const PageTitle: React.FC<{children?:React.ReactNode}> = ({children, ...rest}) => {
    return (
        <p className={styles.title} {...rest}>{children}</p>
    )
}