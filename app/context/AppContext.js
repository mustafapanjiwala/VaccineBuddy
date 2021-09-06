import React from "react";

export const AppContext = React.createContext();

export const AppProvider = (props) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [user, setUser] = React.useState();
    const [uid, setUid] = React.useState()
    const [child, setChild] = React.useState();
    const [children, setChildren] = React.useState()
    const [showUserDetails, setShowUserDetails] = React.useState(true)
    const [isUpdated, setIsUpdated] = React.useState(false)

    React.useEffect(() => console.log("CONTEXT CHANGE | child", child), [child])
    React.useEffect(() => console.log("CONTEXT CHANGE | isUpdated", isUpdated), [isUpdated])

    return (
        <AppContext.Provider value={{
            isAuthenticated, setIsAuthenticated,
            user, setUser,
            child, setChild,
            uid, setUid,
            children, setChildren,
            showUserDetails, setShowUserDetails,
            isUpdated, setIsUpdated
        }}>
            {props.children}
        </AppContext.Provider>
    );
};
