import React, { createContext, useContext, useState } from 'react';

export const CaritoComprarContex = createContext()

const {Provider} = CaritoComprarContex



export const CaritoComprarProvider =({children})=>{
    const [caritoDeCompras,SetCaritoDeCompras] = useState([])
    const agregarCarritoDeCompras = (product) => {
        console.log(product);
        console.log(caritoDeCompras);
        const listaCarito = [...caritoDeCompras,product]
        SetCaritoDeCompras(listaCarito);
        console.log(caritoDeCompras);
      };
    return (
        <Provider value={{ agregarCarritoDeCompras,caritoDeCompras  }}>
             {children}
        </Provider>
       

    )
}