//<<<<<<< HEAD
import React, { useEffect, useState  } from "react";
import  '../../assets/hojas-de-estilo/Cotizacion.css';
import Minimenu from "./MiniMenuCotizaciones";
import axios from "axios";
import Swal from 'sweetalert2'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

// CommonJS
function getFullName(params) {
  return `${params.row.firstName || ''} ${params.row.lastName || ''}`;
}
const columns = [
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'fullName',
    headerName: 'Full name',
    width: 160,
    valueGetter: getFullName,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon' },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei' },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime' },
  { id: 4, lastName: 'Stark', firstName: 'Arya' },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys' },
];

const ListarCotizaciones = () => {

  const Set_Status = () => {
    Swal.fire({
      title: 'Que estado desea ponerle a la cotizacion?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Aprovado',
      denyButtonText: `No Aprovado`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Aprovado!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('No aprovado', '', 'info')
      }
    })
  };

    return (
        <div className="fondo-pantalla-coti">
        <h1 className="Titulocoti">Listado de Cotizaciones</h1>
        <Minimenu/>
        <div className="CuadroCentrado-coti">
          <div className="secionEntradas-coti">
            <br/><br/><br/>
            <div>
                <DataGrid rows={rows} columns={columns} />
            </div>
            <div className="BotonesCotizacion">
                <button className="btn btn-outline-secondary  Listar_Cotizacion_Coti" onClick={Set_Status}>Verificar Status de Cotizacion</button>
                <button className="btn btn-outline-secondary  Listar_Cotizacion_Coti" type='submit'>Exportar Cotizacion a PDF</button>
            </div>
        </div>
    </div>
    </div>
    );

}

export default ListarCotizaciones;

// import React, { Component } from 'react';
 
// class App extends Component {
//     render() {
//         var heading = ['Name', 'City', 'Course'];
//         var body =
//             [['Kapil', 'Jaipur', 'MCA'],
//             ['Aakash', 'Hisar', 'Btech'],
//             ['Mani', 'Ranchi', 'MSc'],
//             ['Yash', 'Udaipur', 'Mtech']
//             ];
//         return (
//             <div >
//                 <Table heading={heading} body={body} />,
//             </div>
//         );
//     }
// }
 
// class Table extends Component {
//     render() {
//         var heading = this.props.heading;
//         var body = this.props.body;
//         return (
//             <table style={{ width: 500 }}>
//                 <thead>
//                     <tr>
//                         {heading.map((head, headID) => <th key={headID} >{head}</th>)}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {body.map((rowContent, rowID) => <TableRow rowContent={rowContent} key={rowID} />)}
//                 </tbody>
//             </table>
//         );
//     }
// }
 
// class TableRow extends Component {
//     render() {
//         var row = this.props.rowContent;
//         return (
//             <tr>
//                 {row.map((val, rowID) => <td key={rowID}>{val}</td>)}
//             </tr>
//         )
//     }
// }
 
// export default App;
// <div className="scrollit-coti">
//                   <table
//                     id = "mytable"
//                     class="table table-striped"
//                     data-toggle="table"
//                     data-url="data3.json"
//                   >
//                     <thead>
//                       <tr>
//                         <th scope="col"># de Referecia</th>
//                         <th scope="col">Tipo de Servicio</th>
//                         <th scope="col">Nombre de Servicio</th>
//                         <th scope="col">Cantidad</th>
//                         <th scope="col">Detalle</th>
//                         <th scope="col">Precio Unitario</th>
//                         <th scope="col">Status</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                           <td>texst</td>
//                           <td>texst</td>
//                           <td>texst</td>
//                           <td>texst</td>
//                           <td>texst</td>
//                           <td>texst</td>
//                       </tr>
//                       <tr>
//                           <td>texst</td>
//                           <td>texst</td>
//                           <td>texst</td>
//                           <td>texst</td>
//                           <td>texst</td>
//                           <td>texst</td>
//                       </tr>
//                     </tbody>
//                   </table>
//               </div>