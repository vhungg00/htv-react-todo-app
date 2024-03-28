import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import loadable from '@loadable/component';

import { ScrollToTop } from './component/ScrollToTop';
import { AppHeader } from './component/AppHeader';
import { ScreenUrlPath } from './typing/ScreenUrlPath';

const Home = loadable(() => import('@/pages/Home'), {
    resolveComponent: (components) => components.Home
})

const LuckyGame = loadable(() => import('@/pages/LuckyWheelGame'), {
    resolveComponent: (components) => components.LuckyWheelGame
});

const PageNotFound = loadable(() => import('@/component/404'));

const App: React.FC = () => {
    return (
        <div>
            <Router>
                <AppHeader />
                <ScrollToTop />
                <Routes>
                    <Route path={ScreenUrlPath.Root} element={<Home />} />
                    <Route path={ScreenUrlPath.LuckyWheelGame} element={<LuckyGame />} />
                    <Route path='*' element={<PageNotFound />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
