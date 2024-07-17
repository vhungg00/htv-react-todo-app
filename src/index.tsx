import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@/context/ThemeProvider'
import './styles/GlobalStyles.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { store } from './store'
import { DialogProvider } from './components/modules/Dialog'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './theme'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <ChakraProvider theme={theme}>
    <ThemeProvider>
      <HelmetProvider>
        <Provider store={store}>
          <DialogProvider>
            <App />
          </DialogProvider>
        </Provider>
      </HelmetProvider>
    </ThemeProvider>
  </ChakraProvider>,
)
reportWebVitals()
