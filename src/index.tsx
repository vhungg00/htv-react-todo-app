import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {HelmetProvider} from "react-helmet-async";
import {Provider} from 'react-redux';
import {ThemeProvider} from '@/context/ThemeProvider';
import '@fontsource/poppins';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import './styles/GlobalStyles.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {store} from './store';

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider>
            <HelmetProvider>
                <Provider store={store}>
                    <App/>
                </Provider>
            </HelmetProvider>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
