import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");
    useEffect(() => {
        const verifyCookie = async () => {
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
        <>
            <div className="home_page">
                <h4>
                    <span>{username}</span>
                </h4>
                <button onClick={ Logout} >LOGOUT</button>
            </div>
            <ToastContainer />
        </>
    );
};

export default Home;
