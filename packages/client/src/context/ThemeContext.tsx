// import {Theme} from 'client/src/stores/reducers/userSettings/typing';
import React from 'react';

// interface IThemeContext {
// 	themeName: Theme.Light | Theme.Dark
// }

// const defaultState = {
// 	themeName: Theme.Light,
// };

export const ThemeContext = React.createContext('light');

// export const ThemeContextProvider: React.FC<{
//   children: React.ReactNode;
//   cookies?: string;
// }> = ({ children, cookies }) => {
//   const localTheme = getCookie('theme', cookies) as Theme;
//
//   const { user } = userState();
//
//   const [currentTheme, setCurrentTheme] = useState<Theme>(
//     localTheme || Theme.LIGHT
//   );
//
//   useEffect(() => {
//     (async () => {
//       if (!localTheme && user) {
//         const themeNameFromDB = await themeService.getUserTheme();
//         const themeNameFromDBIsValid =
//           typeof themeNameFromDB === 'string' &&
//           themeNameFromDB !== currentTheme &&
//           Object.values(Theme).includes(themeNameFromDB);
//
//         if (themeNameFromDBIsValid) {
//           console.log('устанавливаю тему из базы', themeNameFromDB);
//           setCurrentTheme(themeNameFromDB);
//           setCookie('theme', themeNameFromDB);
//         }
//       }
//     })();
//   }, []);
//
//   const handleThemeChange = async () => {
//     const theme = currentTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
//     setCurrentTheme(theme);
//     if (user) await themeService.setUserTheme({ theme_name: theme });
//
//     setCookie('theme', theme);
//   };
//
//   const providerValue = {
//     isDarkTheme: currentTheme === Theme.DARK,
//     handleThemeChange,
//   };
//
//   return (
//     <ThemeContext.Provider value={providerValue}>
//       <ThemeProvider theme={THEMES[currentTheme]}>{children}</ThemeProvider>
//     </ThemeContext.Provider>
//   );
// };
//
// export const useThemeContext = () => {
//   const context = useContext(ThemeContext);
//
//   if (!context) {
//     throw new Error('ThemeContext is unavailable');
//   }
//
//   return context;
// };
