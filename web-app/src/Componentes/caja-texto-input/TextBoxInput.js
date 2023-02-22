import React from "react";
import  '../../assets/hojas-de-estilo/CreateEmpleado.css';

const TextBoxInput = (props) => {

    function manejarCambio (e) {
        props.onChange(e);
    }

    return( 
        <div className="formSpace">
            <label className="form-label-cre">{props.TituloInput}</label>
            <input type="text" placeholder={props.placeholder} className="form-control-cre"
                name={props.name}  onChange={e => manejarCambio(e)} onClick={props.onClick} value={props.valor}
            />
            <p className="mensaje_error-cre">{props.errorInput}</p>
        </div>
    );

   
}

export default TextBoxInput;