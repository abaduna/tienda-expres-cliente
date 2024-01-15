import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
  } from "react-router-dom";

import SubirProductos from "..//pages/SubirProductos/SubirProductos"
import VerProductos from "../pages/VerProductos/VerProductos"
import Login from "../pages/login/Login";
import CompraFalida from "../pages/CompraFalida";
import PanelDeCompras from "../pages/PanelDeCompras/PanelDeCompras";
import PanelEnviados from "../pages/PanelDeCompras/PanelEnviados";
import PanelEntregado from "../pages/PanelDeCompras/PanelEntregado";
import PaguesEditProduct from "../pages/PaguesEditProduct/PaguesEditProduct";
// soluciones 1) hacer un renderizado condicional 2) armar un layout 3)Armar un Hoc 4) Armar un layout en una ruta privada
  const RoutesPrincial =()=>{
    return(
        <Router>
            <Routes>
                <Route path="/" element={<VerProductos/>}/>
                <Route path="/subirProducto" element={<SubirProductos/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/CompraFalida" element={<CompraFalida/>}/> 
                <Route path="/PanelDeCompras" element={<PanelDeCompras/>}/>
                <Route path="/PanelDeenvieados" element={<PanelEnviados/>}/>
                <Route path="/panelentrados" element={<PanelEntregado/>}/> 
                <Route path="/PaguesEditProduct" element={<PaguesEditProduct/>}/>
                <Route
                path="*"
                element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    )
  }

export default RoutesPrincial