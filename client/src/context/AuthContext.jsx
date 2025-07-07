import { createContext, useContext, useState, useEffect } from 'react';
import * as api from '../services/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      // Set token in axios headers
      api.setAuthToken(token);
      // TODO: Fetch user details
    } else {
      localStorage.removeItem('token');
      delete api.API.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const login = async (credentials) => {
    try {
      const { data } = await api.login(credentials);
      setToken(data.token);
      navigate('/');
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const register = async (userData) => {
    try {
      await api.register(userData);
      navigate('/login');
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);