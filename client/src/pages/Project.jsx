import React, {useState} from "react";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Project() {
    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState({
        projectTitle: "",
        description: "",
        projectValue: "",
        deadline: ""
    });

    const {projectTitle, description, projectValue, deadline} = inputValue;

    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setInputValue({
            ...inputValue,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post(
                "http://localhost:4000/project",
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
            projectTitle: "",
            description: "",
            projectValue: "",
            deadline: ""
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

    return (
        <><Navbar />
            <div id="project-form" className="container mt-4">
                <form onSubmit={ handleSubmit }>
                    <h3>Prijava projekta na IT Steering</h3>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="projectTitle"
                            placeholder="Naslov Projekta"
                            value={projectTitle}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="mb-3">
                        <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            rows="3"
                            placeholder="Opis Projekta"
                            value={description}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="business-value"
                            name="projectValue"
                            placeholder="Poslovni učinek"
                            value={projectValue}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="deadline">Rok implementacije</label>
                        <input
                            type="date"
                            className="form-control"
                            id="deadline"
                            name="deadline"
                            placeholder="Rok implementacije"
                            value={deadline}
                            onChange={handleOnChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Oddaj prijavo</button>
                </form>
                <ToastContainer />
            </div>
        </>
    );
}
