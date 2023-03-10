
import '../../assets/hojas-de-estilo/FlujoEfectivo.css';
import React, {useEffect, useState} from "react";
import Overlay from "./Overlay";
import {useRef} from 'react';
import {DataGrid, GridToolbarContainer, GridToolbarFilterButton, GridToolbarExport, esES} from '@mui/x-data-grid';
import axios from 'axios';
import Swal from 'sweetalert2';
//Columnas de la tabla de flujo de efectivos
const columns=[
  { field: 'id', headerName: 'Numero de referencia', width: 200 },
  { field: 'fecha', headerName: 'Fecha', width: 130 },
  { field: 'concepto', headerName: 'Concepto', width: 300 },
  { field: 'valor', headerName: 'Valor', width: 90},
  { field: 'descripcion', headerName: 'Descripcion', width: 160},
  { field: 'categoria', headerName: 'Categoria', width: 200},
];

//let fileObj=null;

const swal = require('sweetalert2');

const FlujoEfectivo = () => {
  let ID="";
  let index=0;
  const [fileObj, setFileObj] = useState(null);
  //Hook para manejar el reseteo del file chooser
  const inputRef = useRef(null);

  //Objeto del file chooser
  const handleFileChange = event => {
    // console.log(event.target.files[0]);

   // fileObj = event.target.files && event.target.files[0];
    setFileObj(event.target.files[0]);
    try {
      swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Se cargo el archivo de manera correcta',
        showConfirmButton: false,
        timer: 1500
      })
    } catch (error) {
      console.log("Hola");
    }
  }
  
  //Reseteo tanto del objeto de file chooser asi como el hook para que pueda ingresar otro archivo
  const resetFileInput = () => {
    swal.fire({
      title: 'Advertencia!',
      text: 'Se limpio el campo del archivo',
      icon: 'warning',
      confirmButtonText: 'OK'
    })
    inputRef.current.value = null;
    setFileObj(null);
  };
  
  //Valida que no se pueda ingresar a la tabla si esta vacio el file chooser
  const Upload =()=>{
    if (fileObj===null) {
      swal.fire({
        title: 'Advertencia!',
        text: 'Debe de seleccionar un archivo antes de poder cargar datos',
        icon: 'warning',
        confirmButtonText: 'OK'
      })
    } else {

      const formData = new FormData();
      formData.append("pdfFile", fileObj);
      try {
        fetch("https://comunicartewebapp-api.herokuapp.com/Gerente/flujo_efectivoPDF", {
          method: "POST",
          body: formData
      }).then(response => {
          return response.text();
      });
      } catch (err) {
        if (err.response.status === 500) {
         console.log(err);
        } else {
         console.log(err);
        }
      }

      swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Se cargaron los datos a la tabla',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  //Controles del overlay
  const [isOpen, setIsOpen] = useState(false);
  const toggleOverlay = () => {
    setIsOpen(!isOpen);
    setTexto("")
  };

  //Metodo para setear la descripcion
  const [Texto, setTexto] = useState("");
  const [categ, setCateg] = useState("");
  //Manejar el combobox de las categorias
  const handleChangeCombo = (e) =>{
    setCateg(e.target.value);
  }

  //Metodo para darle update a la tabla con categoria y descripcion
  
  const Set_Categoria_y_Descripcion =()=>{
    if (categ.length==0 ||Texto.length==0) {
      swal.fire({
        icon: 'error',
        title: 'No se puede dejar los campos de categoria o descripcion en blanco',
        confirmButtonText: 'OK'
      })
    } else {
      setIsOpen(!isOpen)
      ID=selectionModel;
      setRows((prevRows) => {
        for(var i = 0 ; i < rows.length;i++){
          if (rows[i].id==ID) {
            index=i
            return prevRows.map((row, id) =>
              id === index ? { ...row, descripcion:Texto, categoria:categ } : row,
            );
          }
        }
      });
      setTexto("")
      swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'La description y la categoria se agregaron correctamente',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }


  //Limpiar el text area
  const resetTexto = () => {
    setTexto("");
    swal.fire({
      title: 'Advertencia!',
      text: 'Se limpio la descripcion de la tabla',
      icon: 'error',
      confirmButtonText: 'OK'
    })
  };

  //Tabla de material ui y unas validaciones
  const [selectionModel, setSelectionModel] = useState([]);
  const [rows, setRows] = useState([]);

  //Metodo que valida si escogio una fila para despues poder abrir el overlay de
  //categoria y descripcion 
  const Abrir_Categoria_y_Descripcion =()=>{
    if (selectionModel.length===0) {
      swal.fire({
        icon: 'error',
        title: 'Debe de seleccionar un campo de la tabla',
        confirmButtonText: 'OK'
      })
    } else {
      setIsOpen(!isOpen)
    }
  }

  //Creacion de una toolbar con solo los elementos que queremos mostrar
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
      <GridToolbarFilterButton />
      <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  const cargarEstadosCuenta = () => {
    const resultPeticion = axios.get("https://comunicartewebapp-api.herokuapp.com/Gerente/flujo_efectivo");
    resultPeticion.then(data => {

      if(data.data.status !== null && data.data.status === "Error"){
        //No hay registros
      } else {
        //Obtenemos datos
        console.log(data.data);
        setRows(data.data);
      }
    })
  }
  useEffect(()=> {
    window.onbeforeunload = cargarEstadosCuenta();
  },[])

  return (
    <React.Fragment>
    <section>
      <input ref={inputRef} type="file" onChange={handleFileChange} id="file-input" />
      <button className="boton-tabla" onClick={resetFileInput}>Limpiar campo de archivo</button>&nbsp;
      <button className="boton-tabla" onClick={Upload}>Cargar Tabla</button>
      <br/><br/>
      <div style={{background:'whitesmoke'}}>
        <div style={{ height: 400, width: '100%'}}>
          <DataGrid
            localeText={esES.components.MuiDataGrid.defaultProps.localeText} 
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            onSelectionModelChange={(newSelectionModel) => {
              setSelectionModel(newSelectionModel);
            }}
            components={{
              Toolbar: CustomToolbar,
            }}
          />
        </div>
      </div>
      <div className="botones-tabla">
        <button className='boton-tabla' onClick={Abrir_Categoria_y_Descripcion}>Descripcion y Categoria de tabla</button>
        <Overlay isOpen={isOpen} onClose={toggleOverlay}>
          <div className='top'>
            <img src="/images/Logo_ComunicArte_Final.png" className="Comunicarte-logo"alt="LogoComunicarte"/><br/>
            <label className="Titulo">Descripcion de consumo</label>
          </div>
          <br/><br/>
          <div className='middle'>
            <select className="form-select" id="categorias" onChange={e => handleChangeCombo(e)}>
              <option value="">Categorias</option>
              <option value="Compra Ocasional">Compra Ocasional</option>
              <option value="Compra de Proximidad">Compra de Proximidad</option>
              <option value="Compra de Comodidad">Compra de Comodidad</option>
              <option value="Compra de Consumo">Compra de Consumo</option>
              <option value="Compra Especialista">Compra Especialista</option>
            </select>
            <br/>
            <textarea
              className="CuadrodeTexto"
              placeholder="Escriba la descripcion de la fila aqui"
              type="text"
              value={Texto}
              onChange={(e) => setTexto(e.target.value)}
            />
          </div>
          <br/>
          <div className="footer">
            <button className="boton-tablaflujo" onClick={resetTexto}>Limpiar descripcion</button>&nbsp;
            <button className="boton-tablaflujo" onClick={Set_Categoria_y_Descripcion}>Guardar</button>&nbsp;
          </div>
        </Overlay>
      </div>
    </section>
  </React.Fragment>
);
}

export default FlujoEfectivo;