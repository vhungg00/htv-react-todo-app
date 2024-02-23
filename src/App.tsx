import React from 'react';
import styles from '@/styles/modules/app.module.scss';
import {Helmet} from "react-helmet-async";
import {PageTitle} from "@/component/PageTitle";
import {AppHeader} from "@/component/AppHeader";
import {SimpleSlider} from "@/component/Slider/SimpleSlider";

const App: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Todo app</title>
            </Helmet>
            <div className='container'>
                <PageTitle>Todo</PageTitle>
                <SimpleSlider />
            </div>
            <div className={styles.wrapper}>
                <AppHeader />
            </div>

        </>
    );
}

export default App;
