import { Route, Routes } from "react-router-dom";
import { Login, Register, Home } from "./pages"
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    );
}

export default App;