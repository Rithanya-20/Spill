import {Children, createContext, useState} from "react"

const ThemeContext = createContext()

export const ThemeContextProvider = ({children}) => {
    
    const [dark, setDark] = useState(false)

    const darktheme = () => {
        setDark(prev => !prev)
    }

    return <ThemeContext.Provider value={{dark, darktheme}}>{children}</ThemeContext.Provider>
}

export default ThemeContext

