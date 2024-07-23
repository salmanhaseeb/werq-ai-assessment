import React, { createContext, useContext, useState } from "react";
import UserService from "../services/authService";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    localStorage.getItem("auth") ? true : false
  );
  const [user, setUser] = useState(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      const { user } = JSON.parse(storedAuth);
      return user;
    } else {
      return {};
    }
  })
  const [tokens, setTokens] = useState(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      const { tokens: storedTokens } = JSON.parse(storedAuth);
      return storedTokens;
    } else {
      return {};
    }
  });

  const login = async (credentials) => {
    try {
      const response = await UserService.loginUser(credentials);
      setIsAuthenticated(true);
      const accessRefreshTokens = {
        access: response.data.accessToken,
        refresh: response.data.refreshToken,
      };
      const userData = jwtDecode(accessRefreshTokens.access)
      setTokens(accessRefreshTokens);
      setUser(userData.id)
      localStorage.setItem(
        "auth",
        JSON.stringify({ isAuthenticated: true, tokens: accessRefreshTokens, user: userData.id })
      );

      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setTokens({});
    localStorage.removeItem("auth");
  };

  const handleSetTokens = (tokens) => {
    setTokens(tokens);
    localStorage.setItem(
        "auth",
        JSON.stringify({ isAuthenticated: true, tokens: tokens })
      );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, tokens, login, logout, setTokens: (tokens) => handleSetTokens(tokens), user }}>
      {children}
    </AuthContext.Provider>
  );
};
