import React from "react";
import "../index.css"
const Home = ( {username, Logout} ) => {
    return (
        <div className="container ml-2 mr-2">

            <div className="row mt-5 mb-3">
                <div className="col">
                    <h1>IT Steering</h1>
                </div>
                <div className="col d-flex justify-content-end align-items-center">
                    <button type="button" className="btn btn-primary">Dodaj nov projekt</button>
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
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Sample naslov</td>
                    <td>Sample opis</td>
                    <td>sample učinek</td>
                    <td>sample rok</td>
                    <td>sample status</td>
                    <td>
                        <div className="d-flex justify-content-between">
                            <button type="button" className="btn btn-primary me-1 table-button">Izbriši</button>
                            <button type="button" className="btn btn-secondary table-button" >Uredi</button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>

        </div>
    );
};

export default Home;
