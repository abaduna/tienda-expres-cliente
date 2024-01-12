import React, { useContext, useEffect, useState } from "react";

import { CaritoComprarContex } from "../../contexts/carito";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CaritoDeComprasCOmponet from "../../componets/CaritoDeComprasCOmponet";

import { useFetch } from "../../hoocks/useFetch";
function VerProductos() {
  const [productos, setProductos] = useState([]);
  const { agregarCarritoDeCompras } = useContext(CaritoComprarContex);
  const [endpoint, setEndpoint] = useState(`/api/productos`);
  const { state, fetchData } = useFetch(endpoint);
  const { data, loading, error } = state;
  console.log(data);
  useEffect(() => {
    fetchData();
  }, []);

  const agregarACarrito = (product) => {
    console.log(`click`);
    agregarCarritoDeCompras(product);
  };

  return (
    <>
      <CaritoDeComprasCOmponet></CaritoDeComprasCOmponet>

      <div>
        <h1>TIenda</h1>
        <div className="productos-grid">
          {data.length > 0 &&
            data?.map((product) => (
              <Card sx={{ maxWidth: 500 }} className="productos-grid-item  ">
                <CardMedia
                  sx={{ height: 450 }}
                  image={product.imagenurl}
                  title={product.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.descripcion}
                  </Typography>
                  <Typography variant="body3" color="text.primary">
                    {product.precio}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => agregarACarrito(product)}>
                    Agregar a carrito
                  </Button>
                </CardActions>
              </Card>
            ))}
        </div>
      </div>
    </>
  );
}

export default VerProductos;
