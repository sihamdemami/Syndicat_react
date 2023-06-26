import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthUser(){
    const navigate = useNavigate();

    const getToken = () =>{
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    }

    const getUser = () =>{
        const userString = sessionStorage.getItem('user');
        const user_detail = JSON.parse(userString);
        return user_detail;
    }
    const getRole = () =>{
        const roleString = sessionStorage.getItem('role');
        const role_detail = JSON.parse(roleString);
        return role_detail;
    }
    


    const [token,setToken] = useState(getToken());
    const [user,setUser] = useState(getUser());
    const [role,setRole]=useState(getRole());

    const saveToken = (user,token,role) =>{
        sessionStorage.setItem('token',JSON.stringify(token));
        sessionStorage.setItem('user',JSON.stringify(user));
        sessionStorage.setItem('role',JSON.stringify(role));
        setToken(token);
        setUser(user);
        setRole(role);
        navigate('/dashboard');
    }

    const logout = () => {
        sessionStorage.clear();
        navigate('/login');
    }

    const http = axios.create({
        baseURL:"http://localhost:8000/api",
        headers:{
            "Content-type" : "application/json",
            "Authorization" : `Bearer ${token}`
        }
    });
    return {
        setToken:saveToken,
        token,
        user,
        role,
        getToken,
        http,
        logout
    }
}