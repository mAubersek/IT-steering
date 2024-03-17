// useAuth.js
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useAuth = () => {
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    const[isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const verifyCookie = async () => {
            //console.log("Cookie is being verified...");
            if (!cookies.token) {
                navigate("/login");
                return;
            }

            try {
                const { data } = await axios.post(
                    "http://localhost:4000",
                    {},
                    { withCredentials: true }
                );
                const { status, user, role } = data;
                setUsername(user);
                setIsAdmin(role === 'admin');
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

    const isLoggedIn = () => {
        return !!cookies.token;
    };

    return { username, logout, isLoggedIn, isAdmin };


};

export default useAuth;
