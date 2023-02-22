import React from "react";
import '../../assets/hojas-de-estilo/ModificarFacturaSG.css';
import Table from 'react-bootstrap/Table';
import TextField from '@mui/material/TextField';

const EnConstruccion = () => {

    return (
      <React.Fragment>
        <div className= "mf_fondo">
            <div className="mf_caja1">
                <Table responsive className="TablaFactura">
                    <thead>
                        <tr>
                            <th>#</th>
                            {Array.from({ length: 4 }).map((_, index) => (
                                <th key={index}>Table heading</th>
                            ))}
                        </tr>
     
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            {Array.from({ length: 4 }).map((_, index) => (
                            <td key={index}>Table cell {index}</td>
                            ))}
                        </tr>
                    <tr>
                        <td>2</td>
                        {Array.from({ length: 4 }).map((_, index) => (
                        <td key={index}>Table cell {index}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>3</td>
                        {Array.from({ length: 4 }).map((_, index) => (
                        <td key={index}>Table cell {index}</td>
                        ))}
                    </tr>
                    </tbody>
                </Table>
                <button className="botonModificacionLE">
                    Cargar Datos
                </button>
            </div>
            <div className="mf_caja2">
                <TextField
                    className="tfield"
                    label="RTN"
                    variant="filled"
                />
                <TextField
                    className="tfield"
                    label="# Declaracion"
                    variant="filled"
                />
                <TextField
                    className="tfield"
                    label="Nombre o Razon"
                    variant="filled"
                />
                <TextField
                    className="tfield"
                    label="Departanento"
                    variant="filled"
                />
                <TextField
                    className="tfield"
                    label="Municipio"
                    variant="filled"
                />
                <TextField
                    className="tfield"
                    label="Barrio o Colonia"
                    variant="filled"
                />
                <TextField
                    className="tfield"
                    label="Calle o Avenida"
                    variant="filled"
                />
                <TextField
                    className="tfield"
                    label="# Casa"
                    variant="filled"
                />
                <TextField
                    className="tfield"
                    label="Bloque"
                    variant="filled"
                />
                <TextField
                    className="tfield"
                    label="Telefono"
                    variant="filled"
                />
                <TextField
                    className="tfield"
                    label="Celular"
                    variant="filled"
                />
                <TextField
                    className="tfield"
                    label="Referencia Domicilio"
                    variant="filled"
                />
                <TextField
                    className="tfield"
                    label="Correo"
                    variant="filled"
                />
                <TextField
                    className="tfield"
                    label="Profesion u Oficio"
                    variant="filled"
                />
                <button className="botonModificacionLE">
                    Guardar
                </button>
            </div>
        </div>
      </React.Fragment>
      
  );
  }
  
  export default EnConstruccion;