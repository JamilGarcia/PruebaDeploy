import "../../assets/hojas-de-estilo/VerPerfil.css";
import { FaBirthdayCake, FaAt, FaStackExchange } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const VerPerfil = () => {
  const navigate = useNavigate();
  const { datosUsuario } = useContext(AuthContext);
  const datosObtenidos = {
    primer_nombre: "",
    segundo_nombre: "",
    apellidos: "",
    correo_user: "",
    fecha_de_nacimiento: "",
    fecha_de_inicio: "",
    puesto_empresa: "",
    foto_perfil : ""
  };

  const [dataPerfilUsuario, setDataPerfilUsuario] = useState(datosObtenidos);

  const obtenerDatos = async () => {
    const { correo } = datosUsuario;
    const body = { correo: correo };
    // "https://comunicartewebapp-api.herokuapp.com/perfil_usuario" 'http://localhost:5000/perfil_usuario'
    try {
      const respuesta = await fetch("https://comunicartewebapp-api.herokuapp.com/perfil_usuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then((respuesta) => respuesta.json()).then((data) => {
        //console.log(data.foto_perfil);

        //Modificar data_perfil.fecha_de_nacimiento y data_perfil.fecha_de_inicio antes de setear
      const fecha_temp = new Date(data.fecha_de_nacimiento);
      let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(fecha_temp);
      let mo = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(fecha_temp);
      let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(fecha_temp);

      let dateFormated = ye + "-" + mo + "-" + da;
      const fecha_temp2 = new Date(data.fecha_de_inicio);
      let ye2 = new Intl.DateTimeFormat("en", { year: "numeric" }).format(fecha_temp2);
      let mo2 = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(fecha_temp2);
      let da2 = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(fecha_temp2);
      let dateFormated2 = ye2 + "-" + mo2 + "-" + da2;

      setDataPerfilUsuario({
        primer_nombre: data.primer_nombre, segundo_nombre: data.segundo_nombre, apellidos: data.apellidos,
        correo_user: data.correo,fecha_de_nacimiento: dateFormated, fecha_de_inicio: dateFormated2,puesto_empresa: data.puesto_empresa,
        foto_perfil: data.foto_perfil
      });
      });

      
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    window.onbeforeunload = obtenerDatos();
  },[]);

  return (

    <div className="fondo-pantalla-VP">
      <div className="fotoPerfil">
        <img src={dataPerfilUsuario.foto_perfil} className="Avatar-logo" alt="Avatar" />
      </div>
      <div className="Informacion">
        <h6 className="InfoVP">{dataPerfilUsuario.puesto_empresa}</h6>
        <h6 className="InfoVP">
            {dataPerfilUsuario.primer_nombre} {dataPerfilUsuario.segundo_nombre}{" "}
            {dataPerfilUsuario.apellidos}
          </h6>
        <h6 className="InfoVP">
          <FaBirthdayCake />
            Fecha Nacimiento: {dataPerfilUsuario.fecha_de_nacimiento}
        </h6>
        <h6 className="InfoVP">
          <FaAt />
            Correo: {dataPerfilUsuario.correo_user}
        </h6>
        <h6 className="InfoVP">
          <FaStackExchange />
          Fecha Inicio: {dataPerfilUsuario.fecha_de_inicio}
        </h6>
        <div className="botonesVP">
          <button className="botonVP" onClick={() => navigate(-1)}>
            Volver
          </button>
          <button
            className="botonVP"
            onClick={() => navigate("/modificar_perfil")}
          >
            Editar Perfil
          </button>
        </div>
      </div>
    </div>

    /*
    <div className="fondo-pantalla-VP">
      <div className="logo-perfil">
        <img
            src="/images/Logo_ComunicArte_Final.png"
            className="Comunicarte-logo"
            alt="LogoComunicarte"
          />
      </div>
      <div className="caja-perfil">
        <div className="top">
          
          <img src={dataPerfilUsuario.foto_perfil} className="Avatar-logo" alt="Avatar" />
          <h3>
            {dataPerfilUsuario.primer_nombre} {dataPerfilUsuario.segundo_nombre}{" "}
            {dataPerfilUsuario.apellidos}
          </h3>
          <h3>{dataPerfilUsuario.puesto_empresa}</h3>
        </div>
        <div className="datosPerfil">
          <p className="fechanac">
            <FaBirthdayCake />
            Fecha Nacimiento: {dataPerfilUsuario.fecha_de_nacimiento}
          </p>
          <p className="correo">
            <FaAt />
            Correo: {dataPerfilUsuario.correo_user}
          </p>
        </div>
        <p className="fechaini">
          <FaStackExchange />
          Fecha Inicio: {dataPerfilUsuario.fecha_de_inicio}
        </p>
        <div className="botones">
          <button className="boton" onClick={() => navigate(-1)}>
            Volver
          </button>
          <button
            className="boton"
            onClick={() => navigate("/modificar_perfil")}
          >
            Editar Perfil
          </button>
        </div>
      </div>
    </div>*/
  );
};

export default VerPerfil;
