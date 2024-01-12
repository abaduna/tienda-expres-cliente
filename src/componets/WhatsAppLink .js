import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const WhatsAppLink = ({ caritoDeCompras }) => {
  const navigate = useNavigate();
  const [totalPrecio, setTotalPrecio] = useState(0);
  const [nombre, setNombre] = useState(null);
  const [mercadopagoResponse, setMercadopagoResponse] = useState(null);
  console.log(caritoDeCompras);
  const total = caritoDeCompras.reduce(
    (acc, producto) => acc + parseFloat(producto.precio),
    0
  );
  const fetchData = async () => {
    console.log(`click`);
    console.log(total);
const  data ={
  total,
  caritoDeCompras,
  nombre
}
    try {
      const response = await axios.post(
        "http://localhost:3001/mercadopago",
        { data },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data); // Assuming the relevant data is in response.data
      setMercadopagoResponse(response.data);
      window.location.href = response.data;
    } catch (error) {
      console.error("Error al realizar la solicitud:", error.message);
    }
  };

  return (
    <>
      <from>
        <input placeholder="nombre completo"  onChange={e=>setNombre(e.target.value)} value={nombre}></input>
        <Button onClick={fetchData}>Realizar compra</Button>
      </from>
    </>
  );
};

export default WhatsAppLink;
