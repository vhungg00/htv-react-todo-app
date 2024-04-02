import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop: React.FC = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        console.log('url move', pathname)
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}