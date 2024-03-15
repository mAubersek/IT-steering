import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";

const Register = () => {
    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState({
        username: "",
        password: ""
    })

    const {password, username} = inputValue;

    const handleOnChange = (event) => {
        const { name, value } = event.target;

        setInputValue({
            ...inputValue,
            [name]: value
        })

        console.log(username, password);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                "http://localhost:4000/signup",
                {
                    ...inputValue,
                },
                { withCredentials: true }
            );
            const { success, message } = data;
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
            email: "",
            password: "",
            username: "",
        });
    };

    const handleError = (err) =>
        toast.error(err, {
            position: "bottom-left",
        });

    const handleSuccess = (msg) =>
        toast.success(msg, {
            position: "bottom-right",
        });

    return (
        <div id="project-form" className="container mt-4">
            <form onSubmit={ handleSubmit }>
                <h3>Registracija</h3>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="usernameInput"
                        placeholder="Uporabniško ime"
                        name="username"
                        value={ username }
                        onChange={ handleOnChange }
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="business-value"
                        placeholder="Geslo"
                        name="password"
                        value={ password }
                        onChange={ handleOnChange }
                    />
                </div>
                <div className="row">
                    <div className="col">
                        <Link to="/login">
                            <button type="button" className="btn btn-secondary">Prijava</button>
                        </Link>
                    </div>
                    <div className="col d-flex justify-content-end align-items-center">
                        <button type="submit" className="btn btn-primary">Potrdi</button>
                    </div>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Register