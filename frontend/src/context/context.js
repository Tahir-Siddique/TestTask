import React from 'react'
import { createContext, useState, useEffect } from 'react';
import { API_URL } from '../config';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({ children }) => {

    // const token = 

    const [authToken, setAuthToken] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)


    const [User, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(JSON.parse(localStorage.getItem('authTokens')).access) : null)







    let contextData = {
        UserInfo: User,
        'authToken': authToken,
        'setAuthToken': setAuthToken,
        'setUser': setUser,
    }
    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}
