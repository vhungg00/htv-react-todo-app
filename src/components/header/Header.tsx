import React, {useContext} from "react";
import {PlaceThemeContext, Theme} from "@/context/PlaceThemeContext";
import {ThemeContext} from "@/context/ThemeProvider";

export const Header: React.FC = () => {
    const themeList: Theme[] = [
        {
            themeType: 'light',
            color: {
                primaryColor: 'blue'
            }
        },
        {
            themeType: 'dark',
            color: {
                primaryColor: 'red'
            }
        }
    ];
    const themeContext = useContext(ThemeContext)
    console.log(themeContext.theme)
    return (<div>asdas</div>)
};