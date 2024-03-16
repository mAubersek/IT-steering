import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";


const Login = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        username: "",
        password: "",
    });
    const {username, password} = inputValue;
    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };

    const handleError = (err) =>
        toast.error(err, {
            position: "bottom-left",
        });
    const handleSuccess = (msg) =>
        toast.success(msg, {
            position: "bottom-left",
        });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post(
                "http://localhost:4000/login",
                {
                    ...inputValue,
                },
                {withCredentials: true}
            );
            console.log(data);
            const {success, message} = data;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            } else {
                handleError(message);
            }
        } catch (error) {
            console.log(error);
        }
        setInputValue({
            ...inputValue,
            username: "",
            password: "",
        });
    };

    return (
        <>
        <div id="project-form" className="container mt-4">
            <form onSubmit={ handleSubmit }>
                <h3>Prijava</h3>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="usernameInput"
                        placeholder="Uporabniško ime"
                        name="username"
                        value={username}
                        onChange={ handleOnChange }
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        id="passwordInput"
                        placeholder="Geslo"
                        name="password"
                        value={password}
                        onChange={ handleOnChange }
                    />
                </div>
                <div className="row">
                    <div className="col">
                        <Link to="/register">
                            <button type="button" className="btn btn-secondary">Registracija</button>
                        </Link>
                    </div>
                    <div className="col d-flex justify-content-end align-items-center">
                        <button type="submit" className="btn btn-primary">Prijava</button>
                    </div>
                </div>
            </form>
        </div>
            <ToastContainer />
        </>
    );
};

export default Login;