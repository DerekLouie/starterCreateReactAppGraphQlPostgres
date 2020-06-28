import React, { useContext } from 'react'
import { getTokens } from '../helpers/manageTokens'

export const AppContext = React.createContext();
export const useAppContext = () => useContext(AppContext);

export const initialState = {
    isAuthenticated : false,
    user: undefined,
}

// tslint:disable-next-line: no-any
export const mutableContext = (passedUseState: any, initialState: any) => {
    const tokens = getTokens() || {};
    const [isAuthenticated, setIsAuthenticated] = passedUseState(initialState.isAuthenticated || Boolean(tokens.accessToken));
    const [user, setUser] = passedUseState(initialState.user || null);

    const contextValue = {
        ...initialState,
        isAuthenticated, setIsAuthenticated,
        user, setUser,
    };

    return contextValue;
};

export const AppContextProvider = ({ children = null, value = {}}) => {
  return (
          <AppContext.Provider value={value}>
            { children }
          </AppContext.Provider>
  );
}

export default AppContextProvider;
