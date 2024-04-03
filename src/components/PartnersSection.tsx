import React from "react";

import { iconPartnerPuma } from '@/assets/images';

import styles from '@/styles/modules/app.module.scss';

const PartnersSection: React.FC = () => (
    <div className={styles.partners}>
        <ul className={styles.partnersList}>
            <li className={styles.partnerItem}>
                <a href="https://eu.puma.com/uk/en/home" rel="noreferer">
                    <img src={iconPartnerPuma} alt="icon-partner-puma" />
                </a>
            </li>
        </ul>
    </div>
)
export default PartnersSection;