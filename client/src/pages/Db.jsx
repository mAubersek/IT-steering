import React from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Db = () => {
    const handleAddInitial = async () => {
        try {
            const response = await axios.post('http://localhost:4000/db');
            console.log(response.data);
            handleSuccess("Začetni podatki so bili uspešno dodani.");
        } catch (error) {
            console.error('Napaka pri dodajanju začetnih podatkov:', error);
            handleError("Prišlo je do napake pri dodajanju začetnih podatkov.");
        }
    };

    const handleDeleteAll = async () => {
        try {
            const response = await axios.delete('http://localhost:4000/db');
            console.log(response.data);
            handleSuccess("Vsi podatki so bili uspešno izbrisani.");
        } catch (error) {
            console.error('Napaka pri brisanju vseh podatkov:', error);
            handleError("Prišlo je do napake pri brisanju vseh podatkov.");
        }
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
        <>
            <div>
                <button
                    className="btn btn-primary m-1"
                    onClick={handleAddInitial}
                >
                    Dodaj začetne podatke
                </button>
                <button
                    className="btn btn-primary m-1"
                    onClick={handleDeleteAll}
                >
                    Izbriši vse podatke
                </button>
            </div>
            <ToastContainer />
        </>
    )
}

export default Db;
