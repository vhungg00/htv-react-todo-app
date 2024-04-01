import React from 'react';

import { iconLogoOls } from '@/assets/images';
import styles from '@/styles/modules/app.module.scss';

export const AppHeader: React.FC = () => {
    return (
        <header className={styles.header}>
            <p className={styles.appHeader}>
                <img src={iconLogoOls} alt="logo" />
            </p>
        </header>
    )
};