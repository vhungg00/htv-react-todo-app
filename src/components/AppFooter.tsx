import { memo } from 'react';

import styles from '@/styles/modules/app.module.scss';
import { Container } from './Container';

const footer = () => (
    <footer className={styles.footer}>
        <Container>
            <p className={styles.heading}>Copyright © htv</p>
        </Container>
    </footer>
)

export const AppFooter = memo(footer);