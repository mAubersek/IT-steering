import {ToastContainer} from "react-toastify";

const Navbar = ( {username, Logout } ) => {
    return (
        <nav className="navbar bg-body-tertiary">
            <form className="container-fluid justify-content-end mb-0">
            <span className="navbar-text me-2">
                {username}
            </span>
                <button className="btn btn-outline-success me-2" type="button" onClick={ Logout } >Odjava</button>
            </form>
            <ToastContainer />
        </nav>
    );
}

export default Navbar