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

    React.useEffect(() => console.log("CONTEXT CHANGE | children", children), [children])
    // React.useEffect(() => console.log("CONTEXT CHANGE | user", user), [user]);
    // React.useEffect(() => console.log("CONTEXT CHANGE | child", child), [child])
    // React.useEffect(() => console.log("CONTEXT CHANGE | isUpdated", isUpdated), [isUpdated])
    React.useEffect(() => console.log("CONTEXT CHANGE | uid", uid), [uid])
    // React.useEffect(() => console.log("CONTEXT CHANGE | showUserDetails", showUserDetails), [showUserDetails])

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
