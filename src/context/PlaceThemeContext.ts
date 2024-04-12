import {createContext} from 'react';

export type Theme = {
    themeType: 'light' | 'dark',
    color : {
        primaryColor: string
    },
    backgroundColor?: string
}

export interface IPlaceThemeProvider {
    currentTheme: Theme;
    setNewTheme: (args: Theme) => void
}

export const PlaceThemeContext = createContext<IPlaceThemeProvider>({} as IPlaceThemeProvider);