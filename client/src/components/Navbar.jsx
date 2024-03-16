import {ToastContainer} from "react-toastify";

const Navbar = ( {username, Logout, isAdmin } ) => {
    const buttonName = !!username ? "Odjava" : "Prijava";
    const text = !!username && !isAdmin ?
        "Prijavljeni ste kot uporabnik" : isAdmin ? "Prijavljeni ste kot administrator" : null;

    return (
        <nav className="navbar bg-body-tertiary">
            <form className="container-fluid justify-content-end mb-0">
            <span className="navbar-text me-2">
                {text}
            </span>
                <button className="btn btn-outline-success me-2" type="button" onClick={ Logout } >{buttonName}</button>
            </form>
            <ToastContainer />
        </nav>
    );
}

export default Navbar