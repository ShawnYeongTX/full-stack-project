import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase"; // Adjust the import based on your firebase configuration

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for changes to the authentication state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Cleanup the listener when the component is unmounted
    return () => unsubscribe();
  }, []);

  // Handle logout action by signing out and clearing currentUser state
  const logout = () => {
    auth.signOut().then(() => {
      setCurrentUser(null); // Clear the currentUser state after sign-out
    }).catch((error) => {
      console.error("Error during sign-out:", error);
    });
  };

  const value = { currentUser, logout }; // Provide the logout function in context

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
