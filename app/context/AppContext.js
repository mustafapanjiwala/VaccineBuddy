import React from "react";

export const AppContext = React.createContext();

export const AppProvider = (props) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [user, setUser] = React.useState();
    const [child, setChild] = React.useState();

    return (
        <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser, child, setChild }}>
            {props.children}
        </AppContext.Provider>
    );
};
