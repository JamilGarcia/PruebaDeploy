import React, { useEffect, useState  } from "react";
import  '../../assets/hojas-de-estilo/Cotizacion.css';
import Minimenu from "./MiniMenuCotizaciones";
import axios from "axios";

const ListarCotizaciones = () => {
    return (
        <div className="fondo-pantalla-coti">
        <h1 className="Titulocoti">Listado de Cotizaciones</h1>
        <Minimenu/>
        <div className="CuadroCentrado-coti">
          <div className="secionEntradas-coti">
            <br/><br/><br/>
            <div style={{paddingLeft:'10rem'}}>
              <div className="scrollit-coti">
                  <table
                    id = "mytable"
                    class="table table-striped"
                    data-toggle="table"
                    data-url="data3.json"
                  >
                    <thead>
                      <tr>
                        <th scope="col"># de Referecia</th>
                        <th scope="col">Tipo de Servicio</th>
                        <th scope="col">Nombre de Servicio</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Detalle</th>
                        <th scope="col">Precio Unitario</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                  </table>
              </div>
            </div>
            <div className="BotonesCotizacion">
                <button className="btn btn-outline-secondary  Listar_Cotizacion_Coti" type='submit'>Verificar Status de Cotizacion</button>
                <button className="btn btn-outline-secondary  Listar_Cotizacion_Coti" type='submit'>Exportar Cotizacion a PDF</button>
            </div>
            
        </div>
    </div>
    </div>
    );

}

export default ListarCotizaciones;