import React from "react";
import { FieldError } from "react-hook-form";

import styles from '@/styles/modules/app.module.scss';

type ErrorProps = {
    errors: FieldError | undefined,
}

export const ErrorInput: React.FC<ErrorProps> = ({ errors }) => {
    const type = errors?.type;

    if (type) {
        return (
            <div>
                <span className={styles.errorText}>{errors?.message}</span>
            </div>
        )
    }
    return null;
}
