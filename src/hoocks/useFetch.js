import { useCallback, useEffect, useReducer, useState } from "react";
import { API } from "../API";
import { fechReducer, initialState } from "../reducers/fetch";
import { FETCH_DATA } from "./../action/fetch";
import { fetchUsers } from "./../action/tetchUsers.action";
import axios from "axios";
export const useFetch = (endpoint) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [error, setError] = useState(false);

  const [state, dispatch] = useReducer(fechReducer, initialState);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      let { data } = await API.get(endpoint);
      dispatch({ type: FETCH_DATA.SET_DATA, payload: data });
      console.log(data);
    } catch (error) {
      dispatch({ type: FETCH_DATA.SET_ERROR });
    }
  }, [endpoint]);

  const fetchPost = async (datos) => {
    console.log(`fetchPost`);
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("title", datos.title);
      formData.append("description", datos.descripction);
      formData.append("precio", datos.precio);
      formData.append("category", datos.category);
      formData.append("imageUpLoading", datos.imageUpLoading);
      console.log(formData);
      await API.post("/api/productos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.log(`algo salio en en  fetchPost`);
      console.error(error);
    }
  };
  const fetchUsers = async (data) => {
    console.log(data);
    try {
      const response = await axios.post("http://localhost:3001/api/users", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error('Error al realizar la solicitud:', error.message)
    }
  };
  const fetchDeletd = async()=>{
   await API.delete(endpoint)
   dispatch({type:FETCH_DATA.SET_DELETD})
  
  } 
  // useEffect(() => {
  //   fetchData();
  //   fetchPost()
  // }, [endpoint,fetchData]);

  return { state, fetchData, fetchPost, fetchUsers };
};
