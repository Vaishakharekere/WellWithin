import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [uid, setUid] = useState(localStorage.getItem('uid'));
  const [role,setRole] = useState(localStorage.getItem('role'));
  const navigate = useNavigate();

  useEffect(() => {
    console.log(localStorage)
    const savedUser = localStorage.getItem('user'); 
    if (savedUser && savedUser !== 'undefined') {
      setUser(JSON.parse(savedUser));
      setUid(localStorage.getItem('uid'));
      setRole(localStorage.getItem('role'));
    }
  }, []);

  const login = (userData, uid, role) => {
    console.log(userData,uid)
    setUser(userData);
    setUid(uid);
    setRole(role);
    localStorage.setItem('uid',uid);
    localStorage.setItem('user',userData);
    localStorage.setItem('role',role);
    navigate('/');
  };

  const logout = () => {
    setUser(null);
    setUid(null);
    setRole(null);
    localStorage.removeItem('uid');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider value={{ user, uid ,role ,login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
