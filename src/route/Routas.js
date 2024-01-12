import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
  } from "react-router-dom";

import SubirProductos from "..//pages/SubirProductos/SubirProductos"
import VerProductos from "../pages/VerProductos/VerProductos"
import Login from "../pages/login/Login";
// soluciones 1) hacer un renderizado condicional 2) armar un layout 3)Armar un Hoc 4) Armar un layout en una ruta privada
  const RoutesPrincial =()=>{
    return(
        <Router>
            <Routes>
                <Route path="/" element={<VerProductos/>}/>
                <Route path="/subirProducto" element={<SubirProductos/>}/>
                <Route path="/login" element={<Login/>}/>
                
                <Route
                path="*"
                element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    )
  }

export default RoutesPrincial