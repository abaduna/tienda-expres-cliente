import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import NavbarAdmin from "../../componets/NavbarAdmin";
import { useFetch } from "../../hoocks/useFetch";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import Typography from "@mui/material/Typography";
import { API } from "../../API";
import Modal from "@mui/material/Modal";
function PanelEntregado() {
  const [endpoint, setEndpoint] = useState(`/api/pedidos/entregados/enviado`);
  const { state, fetchData } = useFetch(endpoint);
  const { data, loading, error } = state;
  const [open, setOpen] = useState(false);
  const [productList, setProductList] = useState(null);
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
    fetchData();
  }, []);

  const viewOrders = async (id_orden) => {
    console.log(`click`);
    console.log(id_orden);
    setOpen(true);
    try {
      const productListData = await API.get(
        `/api/pedidos/productList/${id_orden}`
      );
      console.log(productListData.data);
      setProductList(productListData?.data);
    } catch (error) {}
  };
  const handleClose = () => setOpen(false);
  return (
    <>
      <NavbarAdmin></NavbarAdmin>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <button onClick={handleClose}>❌</button>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {productList &&
                productList.map((product, index) => (
                  <div key={index}>
                    <p>Product Name: {product.nombre}</p>
                    <p>Quantity: {product.precio}</p>
                    <button>Deletd</button>
                  </div>
                ))}
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
            ></Typography>
          </Box>
        </Modal>
      </div>
      <div>
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
            {Array.isArray(data) &&
              data.map((item) => (
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
      </div>
    </>
  );
}

export default PanelEntregado;
