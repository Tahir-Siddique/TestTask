import React, { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import Homepage from '../components/hompage';
import { API_URL } from '../config';
import axios from "axios";
import AuthContext from '../context/context';

export const PrivateRoute = () => {




    let { UserInfo } = useContext(AuthContext)

    // const auth = data.code !== undefined; // determine if authorized, from context or however you're doing it

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    // <Navigate to="/login" />
    // console.log(Data);/
    return UserInfo ? <Homepage /> : <Navigate to="/login"></Navigate>;
}