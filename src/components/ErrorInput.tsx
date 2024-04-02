import React from "react";
import { FieldError } from "react-hook-form";

import styles from '@/styles/modules/app.module.scss';

export const ErrorInput: React.FC<{ error: FieldError }> = ({ error }) => {
    const type = error?.type;

    if (type) {
        return (
            <div>
                <span className={styles.errorText}>{error?.message}</span>
            </div>
        )
    }
    return null;
}
