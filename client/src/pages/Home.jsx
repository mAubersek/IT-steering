import React, { useEffect, useState } from "react";
import axios from "axios";
import "../index.css";
import {Link} from "react-router-dom";

const Home = ( {isAdmin} ) => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get("http://localhost:4000/projects");
                if (Array.isArray(response.data)) {
                    setProjects(response.data);
                } else {
                    console.error("Projects data is not an array:", response.data);
                }
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className="container ml-2 mr-2">
            <div className="row mt-5 mb-3">
                <div className="col">
                    <h1>IT Steering</h1>
                </div>
                <div className="col d-flex justify-content-end align-items-center">
                    <Link to="/project">
                        <button type="button" className="btn btn-primary">Dodaj nov projekt</button>
                    </Link>

                </div>
            </div>

            <table className="table table-bordered">
                <thead>
                <tr>
                    <th scope="col">Naslov Projekta</th>
                    <th scope="col">Opis Projekta</th>
                    <th scope="col">Poslovni učinek</th>
                    <th scope="col">Rok implementacije</th>
                    <th scope="col">Status</th>
                    {isAdmin && <th scope="col"></th>}
                </tr>
                </thead>
                <tbody>
                {projects.map((project) => (
                    <tr key={project._id}>
                        <td>{project.projectTitle}</td>
                        <td>{project.description}</td>
                        <td>{project.projectValue}</td>
                        <td>{new Date(project.deadline).toLocaleDateString()}</td>
                        <td>{project.status}</td>
                        {isAdmin && (
                            <td>
                                <div className="d-flex justify-content-between">
                                    <button type="button" className="btn btn-primary me-1 table-button">Izbriši</button>
                                    <button type="button" className="btn btn-secondary table-button">Uredi</button>
                                </div>
                            </td>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Home;
