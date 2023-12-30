import { searchInSession } from "@/common/session";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

function UserProvider({children}) {
    const [userAuth, setUserAuth] = useState({});

    useEffect(() => {
        let userInSession = searchInSession("user");

        userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({ access_token: null })
    }, [])

    return (<UserContext.Provider value={{userAuth, setUserAuth}}>
        {children}
    </UserContext.Provider>)
}

function useAuth() {
    const context = useContext(UserContext);
    if(context === undefined) throw new Error("UserContext was used outside of UserProvider");
    return context;
}

export { UserProvider, useAuth };