import React, { useEffect, useState } from "react";
import axios from "axios";
import "../index.css";
import { Link } from "react-router-dom";
import Modal from "react-modal"
import useAuth from "../services/authService";
import Navbar from "../components/Navbar";

Modal.setAppElement("#root");

const Home = () => {
    const { isAdmin } = useAuth();

    const [projects, setProjects] = useState([]);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedProject, setSelectedProject] = useState({});

    function openModal(project) {
        setIsOpen(true);
        setSelectedStatus(project.status);
        setSelectedProject(project);
    }

    function closeModal() {
        setIsOpen(false);
    }

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

    const handleDeleteProject = async (projectId) => {
        try {
            await axios.delete(`http://localhost:4000/project/${projectId}`);
            setProjects(projects.filter(project => project._id !== projectId));
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    const handleUpdateProject = async () => {
        try {
            await axios.put(`http://localhost:4000/project/${selectedProject._id}`, { status: selectedStatus });
            setProjects(projects.map(project => project._id === selectedProject._id ? { ...project, status: selectedStatus } : project));
            closeModal();
        } catch (error) {
            console.error("Error updating project:", error);
        }
    };

    return (
        <>
        <Navbar />
        <div className="container">
            <div className="row mt-5 mb-3">
                <div className="col">
                    <h1>IT Steering</h1>
                </div>
                <div className="col d-flex justify-content-end align-items-center">
                    <Link to="/project">
                        <button type="button" className="btn btn-primary">Prijava projekta</button>
                    </Link>

                </div>
            </div>

            <table className="table table-bordered">
                <thead>
                <tr>
                    <th scope="col" className="align-middle text-center">Naslov Projekta</th>
                    <th scope="col" className="align-middle text-center">Opis Projekta</th>
                    <th scope="col" className="align-middle text-center">Poslovni učinek</th>
                    <th scope="col" className="align-middle text-center">Rok implementacije</th>
                    <th scope="col" className="align-middle text-center">Status</th>
                    {isAdmin && <th scope="col"></th>}
                </tr>
                </thead>
                <tbody>
                {projects.map((project) => (
                    <tr key={project._id}>
                        <td className="align-middle text-center">{project.projectTitle}</td>
                        <td className="align-middle text-center">{project.description}</td>
                        <td className="align-middle text-center">{project.projectValue}</td>
                        <td className="align-middle text-center">{new Date(project.deadline).toLocaleDateString()}</td>
                        <td className={`align-middle text-center ${
                            project
                                .status.toLowerCase()
                                .replace(/\s/g, '-')
                                .replace(/č/g, 'c')}`}
                        >
                            {project.status}
                        </td>
                        {isAdmin && (
                            <td>
                                <div className="d-flex justify-content-between">
                                    <button
                                        type="button"
                                        className="btn btn-primary me-1 table-button"
                                        onClick={() => handleDeleteProject(project._id)}
                                    >
                                        Izbriši
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary table-button"
                                        onClick={() => openModal(project)}
                                    >
                                        Uredi
                                    </button>
                                </div>
                            </td>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Modal"
                className="project-modal"
            >
                <div className="modal-content">
                    <h2>Spremeni status</h2>
                    <label htmlFor="status">Izberi status:</label>
                    <select
                        id="status" value={selectedStatus}
                        onChange={(e) =>
                            setSelectedStatus(e.target.value
                        )}
                        className="form-select"
                    >
                        <option value="V presoji">V presoji</option>
                        <option value="V izvedbi">V izvedbi</option>
                        <option value="Na čakanju">Na čakanju</option>
                        <option value="Zaključeno">Zaključeno</option>
                    </select>
                    <div className="d-flex justify-content-between mt-2">
                        <button className="btn btn-secondary" onClick={closeModal}>Zapri</button>
                        <button className="btn btn-primary" onClick={handleUpdateProject}>Shrani</button>
                    </div>

                </div>
            </Modal>
        </div>
        </>
    );
};

export default Home;
