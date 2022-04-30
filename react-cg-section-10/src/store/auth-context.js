import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
  isLoggenIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {}
});

export const AuthContextProvider = props => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInfo = localStorage.getItem('isLoggedIn')

    if (storedUserLoggedInInfo === '1') {
      setIsLoggedIn(true)
    }
  }, [])

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  const loginHandler = (email, password) => {
   localStorage.setItem('isLoggedIn', '1');
   setIsLoggedIn(true);
  };

  const contextValue = {
   isLoggedIn: isLoggedIn,
   onLogout: logoutHandler,
   onLogin: loginHandler
 };

  return <AuthContext.Provider value={contextValue}>
    {props.children}
  </AuthContext.Provider>
}

export default AuthContext;
