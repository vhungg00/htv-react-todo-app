import React from 'react';
import styles from '@/styles/modules/app.module.scss';
import {Helmet} from "react-helmet-async";
import {PageTitle} from "@/component/PageTitle";

const App: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Todo app</title>
            </Helmet>
            <div className='container'>
                <PageTitle>Todo list</PageTitle>
            </div>
            <div className={styles.wrapper}>
f
            </div>

        </>
    );
}

export default App;
