import {Theme} from './PlaceThemeContext';

const ThemeReducer = (state: any, updateTheme: Theme) => {
    return {...state, updateTheme}
}

export default ThemeReducer;