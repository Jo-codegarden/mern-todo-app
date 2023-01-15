import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import loginRequest from "../api/loginRequest";
import { TokenContext } from "../App";
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import { Footer } from "../components/Footer";

export const LoginPage = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [token, setToken] = useContext(TokenContext);
    const navigate = useNavigate();


    const handleLogin = (e) => {
        e.preventDefault();
        loginRequest(password)
            .then(({token}) => {
                setToken(token);
                navigate("/");
            }).catch((err) => {
                setError(err.message);
        });
    }

    return (
    <div>
        <h1 className="box" id="heading">Login</h1>
        <div style={{color: "red", marginLeft: "-200px"}}>{error}</div>
        <form className="box" onSubmit={handleLogin}>
            <div>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password: 'abc'" id="password"/>
                <button style={{transform: 'translateY(-5%)'}}>
                    <Fab>
                        <NavigationIcon />
                    </Fab>
                </button>
            </div>
        </form>
        <Footer style={{marginTop: "100vh"}} />
    </div>
    )
}