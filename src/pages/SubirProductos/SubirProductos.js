import React, { useEffect, useState } from "react";
import { db } from "../../confic/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { storage } from "../../confic/firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { auth } from "../../confic/firebase";
import Alert from "@mui/material/Alert";
import { Input } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hoocks/useFetch";
function SubirProductos() {
  const navigate = useNavigate();
  const [title, SetTitle] = useState("");
  const [descripcion, SetDescripcion] = useState("");
  const [precio, SetPrecion] = useState("");
  const [url, SetUrl] = useState("");
  const [ShowPoster, SetshowPoster] = useState(false);
  // const [producto,SetProductos] = useState({})
  const [imageUpLoading, setImageUpLoading] = useState(null);
  const [endpoint, setEndpoint] = useState(`/api/productos`);
  const { state, fetchPost } = useFetch(endpoint);
  const { data, loading, error } = state
  

  const empty = () => {
    setImageUpLoading(null);
    SetUrl("");
    SetDescripcion("");
    SetTitle("");
    SetPrecion("");
    SetshowPoster(false);
  };

  const handlerMandeDataTotal = (e) => {
    e.preventDefault()
    console.log(`click`);
    let datos = {
      title,
      descripction: descripcion,
      precio,
      category: "perfumes", //ojo que este esta hardcodeado
      imageUpLoading,
    };
    console.log(`handlerMandeDataTotal`);
    console.log(datos);
    fetchPost(datos);
    empty();
  };
  useEffect(()=>{
     let token = localStorage.getItem("token")
const  usuers = parseJwt(token)
console.log(usuers);

console.log("token de sp "+token);
if (usuers.userName !="abaduna") {
  console.log("sali de aka");
  console.log("anda de aka no se que estas haciendo aka");
}
  },[])
  function parseJwt (token) {
    if (token != "") {
      var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
    }
    
}
  return (
    <>
      <h1>Subir Producto</h1>
      <label>Titulo </label>
      {ShowPoster && <Alert severity="success">Subiendo</Alert>}
      <form  onSubmit={handlerMandeDataTotal}  enctype="multipart/form-data">
        <Input
          placeholder="Titulo"
          value={title}
          name={title}
          onChange={(e) => SetTitle(e.target.value)}
          type="string"
          className="anchoDePantalla"
        ></Input>
        <Input
          placeholder="Descripcion..."
          value={descripcion}
          name={descripcion}
          onChange={(e) => SetDescripcion(e.target.value)}
          type="string"
          className="anchoDePantalla"
        ></Input>
        <input
          type="file"
        
          name={imageUpLoading}
          className="anchoDePantalla"
          onChange={(e) => setImageUpLoading(e.target.files[0])}
        />
        <Input
          placeholder="Precio"
          value={precio}
          name={precio}
          onChange={(e) => SetPrecion(e.target.value)}
          type="number"
        
          className="anchoDePantalla"
        ></Input>
        {/* <Button
        type="button"
        onClick={handlerMandeDataTotal}
        className="anchoDePantalla"
        variant="contained"
      >
        Contained
      </Button> */}
        <button
          type="submit"
          className="btn btn-primary mt-3"
          
        >
          enviar data
        </button>
      </form>
    </>
  );
}

export default SubirProductos;
