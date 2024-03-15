// useAuth.js
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useAuth = () => {
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const verifyCookie = async () => {
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
                if (!status) {
                    removeCookie("token");
                    navigate("/login");
                }
            } catch (error) {
                console.error("Error verifying cookie:", error);
            }
        };

        verifyCookie();
    }, [cookies, navigate, removeCookie]);

    const logout = () => {
        removeCookie("token");
        navigate("/login");
    };

    return { username, logout };
};

export default useAuth;
