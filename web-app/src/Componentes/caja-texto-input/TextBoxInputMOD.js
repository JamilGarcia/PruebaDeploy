import React from "react";
import  '../../assets/hojas-de-estilo/ListarEmpleados.css';

const TextBoxInputMOD = (props) => {

    function manejarCambio (e) {
        props.onChange(e);
    }

    return( 
        <div className="formsDatos">
            <label className="form-label-mod">{props.TituloInput}</label>
            <input type="text" value={props.valor} className="form-control-mod"
                name={props.name}  onChange={e => manejarCambio(e)} onClick={props.onClick}
            />
            <p className="mensaje_error-ModElim">{props.errorInput}</p>
        </div>
    );

   
}

export default TextBoxInputMOD;