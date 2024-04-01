import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import loadable from '@loadable/component';

import { ScrollToTop } from './component/ScrollToTop';
import { AppHeader } from './component/AppHeader';
import { ScreenUrlPath } from './typing/ScreenUrlPath';
import { AppFooter } from './component/AppFooter';

const Home = loadable(() => import('@/pages/Home'), {
    resolveComponent: (components) => components.Home
})

const LuckyGame = loadable(() => import('@/pages/LuckyWheelGame'), {
    resolveComponent: (components) => components.LuckyWheelGame
});

const FormMultiple = loadable(() => import('@/component/FormWithMultipleSteps'), {
    resolveComponent: (components) => components.FormWithMultipleSteps
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
                    <Route path={ScreenUrlPath.FormWithMultipleSteps} element={<FormMultiple />} />
                    <Route path='*' element={<PageNotFound />} />
                </Routes>
                <AppFooter />
            </Router>
        </div>
    );
};

export default App;
