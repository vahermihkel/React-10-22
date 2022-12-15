import { createContext, useState } from "react";


const AuthContext = createContext(null);

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(checkIfLoggedIn());

  function checkIfLoggedIn() {
    if (sessionStorage.getItem("token") !== null) {
      return true;
    } else {
      return false;
    } // aegumist????
  }

  const loginHandler = (token) => {
    sessionStorage.setItem("token", token);
    setIsLoggedIn(true);
  }

  const logoutHandler = () => {
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
  }

  return(
    <AuthContext.Provider value={{
      loggedIn: isLoggedIn,
      login: loginHandler,
      logout: logoutHandler
    }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;