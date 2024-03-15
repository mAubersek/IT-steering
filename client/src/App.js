import {Route, Routes, useNavigate} from "react-router-dom";
import {Login, Register, Home, Project} from "./pages"
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import 'react-toastify/dist/ReactToastify.css';
import {useCookies} from "react-cookie";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Navbar from "./components/Navbar";

function App() {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");
    useEffect(() => {
        const verifyCookie = async () => {
            //TODO: da bo šlo tut na register
            console.log(window.location.pathname)
            if (window.location.pathname !== "/register" && !cookies.token) {
                navigate("/login");
                return;
            }

            try {
                const { data } = await axios.post(
                    "http://localhost:4000",
                    {},
                    { withCredentials: true }
                );
                const { status, user } = data;
                setUsername(user);
                if (status) {
                    // User is logged in
                } else {
                    removeCookie("token");
                    navigate("/login");
                }
            } catch (error) {
                // Handle error
                console.error("Error verifying cookie:", error);
            }
        };
        verifyCookie();
    }, [cookies, navigate, removeCookie]);

    const Logout = () => {
        removeCookie("token");
        navigate("/login");
    };

    return (
        <div className="App">
                <Navbar{...{username, Logout}} />
                <Routes>
                    <Route path="/" element={<Home{...{username, Logout}}/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/project" element={<Project/>}/>
                </Routes>
        </div>
    );
}

export default App;