import React, { createContext, useContext, useState, useReducer } from 'react';
export const StateContext = createContext();

const initialState = {
  chat: false,
  userProfile: false,
};

export const residentReducer = (state, action) => {
  switch (action.type) {
    case 'SET_RESIDENTS':
      return {
        residents: action.payload
      }
    case 'CREATE_RESIDENT':
      return {
        residents: [action.payload, ...state.residents]
      }
    case 'DELETE_RESIDENT':
      return {
        residents: state.residents.filter((r) => r._id !== action.payload._id)
      }
    case 'UPDATE_RESIDENT':
      return {
        ...state,
        residents: [action.payload, ...state.residents.filter( r => r._id !== action.payload._id)]
      }
      default:  
        return state
  }
}

export const ContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState('#03C9D7');
  const [currentMode, setCurrentMode] = useState('Light');
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);

  const [flag, setFlag] = useState(false);
  const [visible, setVisible] = useState(false);

  const [update, setUpdate] = useState('');

  const [state, dispatch] = useReducer(residentReducer, {
    residents: null
  })

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem('themeMode', e.target.value);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem('colorMode', color);
  };

  const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider value={{ ...state, dispatch, update, setUpdate, flag, setFlag, visible, setVisible, currentColor, currentMode, activeMenu, screenSize, setScreenSize, handleClick, isClicked, initialState, setIsClicked, setActiveMenu, setCurrentColor, setCurrentMode, setMode, setColor, themeSettings, setThemeSettings }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);