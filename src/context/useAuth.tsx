import React, { useState, createContext, useContext } from 'react';
import { useWeb3React } from '@web3-react/core';

interface AuthProps {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

type Props = {
  children?: React.ReactNode
};

const AuthContext = createContext<AuthProps>({} as AuthProps);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const { deactivate } = useWeb3React();
  const [isAuthenticated, setIsAuthernticated] = useState(false);

  const login = async () => {
    setIsAuthernticated(true);
  };

  const logout = () => {
    deactivate();
    setIsAuthernticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  return useContext(AuthContext);
};