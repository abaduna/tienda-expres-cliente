import React, { useEffect } from "react";

import NavbarAdmin from "../../componets/NavbarAdmin";
import { useFetch } from "../../hoocks/useFetch";
import { useState } from "react";
import { API } from "../../API";
import ComponetTable from "./components/ComponetTable";
function PanelEnviados() {
  const [endpoint, setEndpoint] = useState(
    `/api/pedidos/entregados/por entregar`
  );
  const { state, fetchData } = useFetch(endpoint);
  const { data, loading, error } = state;
  const [open, setOpen] = useState(false);
  const [productList, setProductList] = useState(null);



  const send =async (id_orden) => {
    await API.patch(`/api/pedidos/ModifyStatus/${id_orden}`, {
      estado: "enviado",
    });
    fetchData()
  };
  const viewOrders = async(id_orden) => {
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
const handleClose =()=> setOpen(false);
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <NavbarAdmin></NavbarAdmin>
      <div>
        <ComponetTable
          data={data}
          send={send}
          viewOrders={viewOrders}
          open={open}
          productList={productList}
          handleClose={handleClose}
        ></ComponetTable>
      </div>
    </>
  );
}

export default PanelEnviados;
