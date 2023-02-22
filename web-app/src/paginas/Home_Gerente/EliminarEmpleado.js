import "../../assets/hojas-de-estilo/EliminarEmpleado.css";

import React, { useContext, useEffect, useState } from "react";


const EliminarEmpleado = () => {
  
    return (
        <div className="fondo-pantallaLE">
          <div className="caja-izquierdaLE">
    
        <section>
          <div className="scrollitLE">
          <table
              id = "mytable"
              class="table table-stripedLE"
              data-toggle="table"
              data-url="data2.json"
            >
              <thead>
                <tr>
                  <th scope="col">P.Nombre</th>
                  <th scope="col">S.Nombre</th>
                  <th scope="col">Apellidos</th>
                </tr>
              </thead>
            </table>
          </div>
          
        </section>
          </div>
          <div className="caja-derechaLE">
           
    
          </div>
        </div>
      );
    };

export default EliminarEmpleado;