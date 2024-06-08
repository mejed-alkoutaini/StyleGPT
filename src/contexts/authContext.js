// authContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import firebase from "../utils/firebase";

// Create an AuthContext to provide auth-related data
const AuthContext = createContext();

// AuthProvider component to wrap the app and provide auth state
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Use effect to listen for auth state changes
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user?.multiFactor?.user); // Set the current user
      setLoading(false); // Set loading to false after user is set
    });

    // Cleanup the subscription on unmount
    return unsubscribe;
  }, []);

  // Provide the current user and loading state to children
  return <AuthContext.Provider value={{ currentUser, loading }}>{!loading && children}</AuthContext.Provider>;
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
