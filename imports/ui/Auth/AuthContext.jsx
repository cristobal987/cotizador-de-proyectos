import { createContext } from 'react';

const AuthContextType = {
    user: null,
    signin : (user, callback) => {},
    signout : (callback) => {}
  }

export const AuthContext = createContext(AuthContextType);