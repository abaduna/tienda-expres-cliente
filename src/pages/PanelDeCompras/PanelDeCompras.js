import React, { useEffect, useState } from "react";
import { useFetch } from "../../hoocks/useFetch";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Table from "react-bootstrap/Table";
import { API } from "../../API";
function PanelDeCompras() {
  const [endpoint, setEndpoint] = useState(`/api/pedidos/entregados`);
  const { state, fetchData } = useFetch(endpoint);
  const { data, loading, error } = state;
  const [ordenado, setOrdenado] = useState("");
  const [open, setOpen] = React.useState(false);
  const [productList, setProductList] = useState(null);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log(data);

  let datosOrdenados = [];
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  useEffect(() => {
    if (Array.isArray(data)) {
      datosOrdenados = data.sort((a, b) => b.id - a.id);
      console.log(datosOrdenados);
      setOrdenado(datosOrdenados);
      console.log(`ordene los datos`);
    }
  }, [data]);
  useEffect(() => {
    fetchData();
  }, []);
  const viewOrders = async(id_orden) => {
    setOpen(true);
    try {
      const productListData  = await API.get(`/api/pedidos/productList/${id_orden}`)
     console.log(productListData.data );
     setProductList(productListData?.data);
    } catch (error) {
      
    }
     
    }
  
  return (
    <>
      <div> 
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            
            <Typography id="modal-modal-title" variant="h6" component="h2">
            {productList &&
                productList.map((product, index) => (
                  <div key={index}>
                    <p>Product Name: {product.nombre}</p>
                    <p>Quantity: {product.precio}</p>
                    {/* Add more properties as needed */}
                  </div>
                ))}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
             
              <button onClick={handleClose}>❌</button>
            </Typography>
          </Box>
          
        </Modal>
        
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>nombre</th>
            <th>fecha</th>
            <th>estado</th>
            <th>total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(ordenado) &&
            ordenado.map((item) => (
              <tr key={item.id}>
                <td>{item.nombre}</td>
                <td>{parseInt(item.cuando_fue_comprado, 10)}</td>
                <td>{item.estado}</td>
                <td>{item.total}</td>
                <td>
                  <button onClick={() => viewOrders(item.id_orden)}>
                    📚Ver lista de productos
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
}

export default PanelDeCompras;
