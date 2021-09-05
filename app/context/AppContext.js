import React from "react";

export const AppContext = React.createContext();

export const AppProvider = (props) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [user, setUser] = React.useState();
    const [uid, setUid] = React.useState()
    const [child, setChild] = React.useState();
    const [children, setChildren] = React.useState()

    React.useEffect(() => console.log("CONTEXT CHANGE | child", child), [child])

    return (
        <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser, child, setChild, uid, setUid, children, setChildren }}>
            {props.children}
        </AppContext.Provider>
    );
};
