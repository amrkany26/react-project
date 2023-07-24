import React, { createContext, useState, } from "react";

const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
  
    const signIn = (email, password) => {
      if (email) {
        const signedInUser = {
          name: email.split("@")[0],
          email: email,
        };
    setUser(signedInUser);
  };
};

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

