import React from 'react';
import { Helmet } from 'react-helmet-async';

import { Container } from '@/components/Container';

export const Home: React.FC = () => {
    return (
    <>
        <Helmet>
            <title>Home</title>
        </Helmet>
        <Container>
            <p>Home</p>
        </Container>
    </>
    )
};