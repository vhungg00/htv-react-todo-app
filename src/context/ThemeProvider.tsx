import React, {useCallback, useState} from "react";

export type Theme = {
    themeType: 'light' | 'dark',
    colors : {
        primaryColor: string
    },
    backgroundColor?: string
}

export type ThemeContextValue = {
    theme?: Theme;
    onChangeTheme?: (theme: string) => void
}

const lightTheme: Theme = {
    themeType: 'light',
    colors: {
        primaryColor: '#fff'
    }
}

const darkTheme: Theme = {
    themeType: 'dark',
    colors: {
        primaryColor: '#000'
    }
}

const initialStyleContextValue: ThemeContextValue = ({} as ThemeContextValue);

export const ThemeContext = React.createContext<ThemeContextValue>(initialStyleContextValue);

export const ThemeProvider: React.FC<{children: React.ReactElement}> = ({children}) => {
    const [theme, setTheme] = useState<Theme>(darkTheme);

    const onChangeTheme = useCallback((themeSelect: string) => {
        setTheme(themeSelect === 'light' ? lightTheme : darkTheme)
    },[])

    return <ThemeContext.Provider
        value = {{onChangeTheme, theme}}
    >
        {children}
    </ThemeContext.Provider>
}