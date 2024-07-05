import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import loadable from '@loadable/component'

// import { ScrollToTop } from './components/ScrollToTop';
import { AppHeader } from './components/AppHeader'
import { ScreenUrlPath } from './typing/ScreenUrlPath'
import { AppFooter } from './components/AppFooter'
import { ScrollToTop } from './components/ScrollToTop/ScrollToTop'
// import { ScrollTopNav } from './components/elements/ScrollTopNav'

const Home = loadable(() => import('@/pages/Home'), {
  resolveComponent: components => components.Home,
})

const LuckyGame = loadable(() => import('@/pages/LuckyWheelGame'), {
  resolveComponent: components => components.LuckyWheelGame,
})

const FormMultiple = loadable(
  () => import('@/components/FormWithMultipleSteps'),
  {
    resolveComponent: components => components.FormWithMultipleSteps,
  },
)

const AllProduct = loadable(() => import('@/pages/AllProduct'), {
  resolveComponent: components => components.AllProduct,
})

const Partners = loadable(() => import('@/components/PartnersSection'))

const PageNotFound = loadable(() => import('@/components/404'))

const CaculatorYearMonth = loadable(
  () => import('@/pages/CaculatorYearMonth'),
  {
    resolveComponent: component => component.Caculator,
  },
)

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <AppHeader />
        {/* <ScrollToTop /> */}
        {/* <ScrollTopNav /> */}
        <Routes>
          <Route path={ScreenUrlPath.Root} element={<Home />} />
          <Route path={ScreenUrlPath.LuckyWheelGame} element={<LuckyGame />} />
          <Route
            path={ScreenUrlPath.FormWithMultipleSteps}
            element={<FormMultiple />}
          />
          <Route path={ScreenUrlPath.AllProduct} element={<AllProduct />} />
          <Route
            path={ScreenUrlPath.CaculatorYearMonthYear}
            element={<CaculatorYearMonth />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Partners />
        <AppFooter />
        <ScrollToTop scrollY={300} />
      </Router>
    </div>
  )
}

export default App
