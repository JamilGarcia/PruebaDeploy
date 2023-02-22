
import "../../assets/hojas-de-estilo/DescripcionTablaFlujoEfectivo.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";


const DescripcionTablaFlujoEfectivo = () => {
  const navigate = useNavigate();

  const [Texto, setTexto] = useState("");
  const [disabled, setDisabled] = useState(true);

  {
    /* RESET TEXTAREA */
  }
  const resetTexto = () => {
    setTexto("");
  };

  {
    /* HABILITAR TEXTAREA */
  }
  function handleEnable() {
    setDisabled(false);
  }

  {
    /* DESHABILITAR TEXTAREA */
  }
  function handleDisable() {
    setDisabled(true);
  }

  let categorias = [
    { id: 0, name: "Compra Ocasional" },
    { id: 1, name: "Compra de Proximidad" },
    { id: 2, name: "Compra de Comodidad" },
    { id: 3, name: "Compra de Consumo" },
    { id: 4, name: "Compra Especialista" },
  ];

  return (
    <div className="fondo-pantalla-descripcion-tabla">
      <div className="caja-descripcion">
        <div className="top">
          <img
            src="/images/Logo_ComunicArte_Final.png"
            className="Comunicarte-logo"
            alt="LogoComunicarte"
          />
        </div>
        <div>
          <label className="Titulo">Descripcion de consumo</label>
          <select className="form-select" id="categorias" required="">
                <option value="">Escoge una opcion..</option>
                <option>Compra Ocasional</option>
                <option>Compra de Proximidad</option>
                <option>Compra de Comodidad</option>
                <option>Compra de Consumo</option>
                <option>Compra Especialista</option>
              </select>
        </div>
        <textarea
          className="CuadrodeTexto"
          placeholder="Escriba descripcion del tabla aqui."
          type="text"
          disabled={disabled}
          value={Texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <div className="botones-tablaflujo">
          <button className="boton-tablaflujo" onClick={() => navigate(-1)}>
            Volver
          </button>
          <button className="boton-tablaflujo" onClick={resetTexto}>
            Eliminar
          </button>
          <button className="boton-tablaflujo" onClick={handleEnable}>
            Modificar
          </button>
          <button className="boton-tablaflujo" onClick={handleDisable}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DescripcionTablaFlujoEfectivo;
