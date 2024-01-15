import React, { useEffect, useState } from "react";
import { useFetch } from "../../hoocks/useFetch";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container, Row, Col } from "react-bootstrap";
import { API } from "../../API";
import NavbarAdmin from "../../componets/NavbarAdmin";
function PaguesEditProduct() {
  const [endpoint, setEndpoint] = useState(`/api/productos`);
  const { state, fetchData } = useFetch(endpoint);
  const { data, loading, error } = state;

  useEffect(() => {
    fetchData();
  }, []);
  const fetchDeletd = async (id) => {
    try {
      await API.delete(`/api/productos/${id}`);
      console.log(`eliminado coreectamente`);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteProduct = async (id) => {
    fetchDeletd(id);
    fetchData();
  };
  return (
    <><NavbarAdmin></NavbarAdmin>
   
      <Container>
        <Row>
          {data.length > 0 &&
            data?.map((product) => (
              <Col xs={6} lg={4}>
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
                    <Button
                      size="small"
                      onClick={() => deleteProduct(product.id)}
                    >
                      Eliminar
                    </Button>
                  </CardActions>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
}

export default PaguesEditProduct;
