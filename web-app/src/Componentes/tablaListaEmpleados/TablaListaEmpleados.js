import React, {useState} from 'react'
import "../../assets/hojas-de-estilo/ListarEmpleados.css";

const TablaListaEmpleados = ({columnas, datosTabla, setUsuarioSeleccionado}) => {

    const [selectedRow, setSelectedRow] = useState(null);

    const handleRowClick = async dataRow => {
        setSelectedRow(selectedRow === dataRow ? null : dataRow);
        setUsuarioSeleccionado(selectedRow === dataRow ? null : dataRow.correo);
    }
    return(
        <table id = "mytable" className="table table-stripedLE" data-toggle="table" data-url="data2.json">
            <thead></thead>
            <tr>
                {columnas.map((item,index) => <th>{item.heading}</th>)}
            </tr>
            <tbody>
                {datosTabla.map((item, index) => <FilaEmpleado dataRow={item} columna = {columnas} handleRow={handleRowClick} selectedRow={selectedRow === item} />)}
            </tbody>
        </table>
    )
}

const FilaEmpleado = ({dataRow, selectedRow,columna, handleRow}) => {

     const styleBGColor = {
         backgroundColor: selectedRow ? "#3297FD" : ""
     }

    return (
        <tr style={styleBGColor} onClick={() => handleRow(dataRow)}>
            {columna.map((columnItem, index) => {
                return(<td>{dataRow[`${columnItem.value}`]}</td>);
            })}
        </tr>
    )
    
}
export default TablaListaEmpleados;