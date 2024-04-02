import React from 'react';

import { iconLogo } from '@/assets/images';
import styles from '@/styles/modules/app.module.scss';

export const AppHeader: React.FC = () => {
    return (
        <header className={styles.header}>
            <p className={styles.appHeader}>
                <img src={iconLogo} alt="logo" />
            </p>
        </header>
    )
};