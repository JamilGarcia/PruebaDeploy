import React from "react";
import "../../assets/hojas-de-estilo/VentanaModificacion.css";
import { useState, useContext, useEffect} from "react";
import TextBoxInput from "../../Componentes/caja-texto-input/TextBoxInput";
import { obtenerDatosPerfil } from "../../Componentes/Funciones/PeticionDatosPerfil";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import axios from 'axios';

const VentanaModificacion = () => {
  
  const {datosUsuario} = useContext(AuthContext);
  const navigate = useNavigate();
  const [datosPerfilUsuario, setDatosPerfilUsuario] = useState(
    {
      primer_nombre: "", segundo_nombre: "",
      apellidos: "", correo: "", foto_perfil: ""
    });
  const [erroresMP, setEroresMP] = useState({
    primer_nombre:"",segundo_nombre:"",
    apellidos: "", correo:""
  });
  const [copiaDatosPerfil, setCopiaDatosPerfil] = useState({
    primer_nombre: "", segundo_nombre: "", apellidos: "", correo: ""
  });
  
  //Funcion para cargar datos en ventana de modificar perifl
  useEffect(() => {
    const {correo_usuario} = datosUsuario;
    console.log(correo_usuario);
    window.onbeforeunload = obtenerDatosPerfil("modificar_perfil", correo_usuario, setDatosPerfilUsuario, setCopiaDatosPerfil);
  },[]);


  const handleSubmit = (e) => {
    e.preventDefault();
    validarModificarPefil().then((respuestaValidate) =>  ActualizarDatos(respuestaValidate));
   
  }

  //Metodo para manejar cmabios en inputs de texto
  const onChange = (e) => setDatosPerfilUsuario({...datosPerfilUsuario, [e.target.name]: e.target.value});
  
  const eliminarErrorMP = async (e) => {
    setEroresMP({...erroresMP, [e.target.name]: ""});
  }

  const ActualizarDatos = async (respuestaValidate) => {
    
    if(respuestaValidate){
      if(datosPerfilUsuario.primer_nombre !== copiaDatosPerfil.primer_nombre || datosPerfilUsuario.segundo_nombre !== copiaDatosPerfil.segundo_nombre ||
        datosPerfilUsuario.apellidos !== copiaDatosPerfil.apellidos ||datosPerfilUsuario.correo !== copiaDatosPerfil.correo){
        //Algun campo es diferente
          //Llamar a peticion de fetch
          try{
            const {correo} = datosUsuario;
            //https://comunicartewebapp-api.herokuapp.com
            //http://localhost:5000/modificar_perfil
            const peticionModificar = await axios.put(
              "https://comunicartewebapp-api.herokuapp.com/modificar_perfil",{
                primer_nombre: datosPerfilUsuario.primer_nombre,
                segundo_nombre: datosPerfilUsuario.segundo_nombre,
                apellidos: datosPerfilUsuario.apellidos,
                correoNuevo: datosPerfilUsuario.correo,
                correoViejo: correo
              }
            ).then((respuesta)=> {

              if(respuesta.data === "successMod"){
                Swal.fire({
                  title: 'Configuración exitosa',
                  text: '¡La actualización de la información fue exitosa!',
                  icon: 'success',
                });
              } else {
                Swal.fire({
                  title: 'Error',
                  icon: 'error',
                  text: 'Ocurrio un error al momento de hacer la configuración\n'+
                      'Intente de nuevo',
                });
              }
            })

          }catch(error){
            console.log(error);
            Swal.fire({
              title: 'Error',
              icon: 'error',
              text: 'Ocurrio un error al momento de hacer la configuración\n'+
                  'Intente de nuevo',
            });
          }
      } else {
        //No ocurrio
        Swal.fire({
          title: 'Información',
          text: 'No ocurrieron cambios en los datos.',
          icon: 'info'
        });
      }
    }
  }

  const validarModificarPefil = async ()  =>{
    let validarCamposGuardar = true;
    let validarCamposVacios = true;
    let erroresValidacionMP = {primer_nombre: "", segundo_nombre: "", apellidos: "", correo: ""};
    //1.Validar si campo esta vacio
    //1.1 Primer nombre
    if(datosPerfilUsuario.primer_nombre === ""){
      erroresValidacionMP.primer_nombre = "¡No se puede dejar el campo vacio!";
      validarCamposVacios = false;
    }
    //1.3 Apellidos
    if(datosPerfilUsuario.apellidos === ""){
      erroresValidacionMP.apellidos = "¡No se puede dejar el campo vacio!";
      validarCamposVacios = false;
    }
    //1.4 Correo
    if(datosPerfilUsuario.correo === ""){
      erroresValidacionMP.correo = "¡No se puede dejar el campo vacio!";
      validarCamposVacios = false;
    }

    //No hay campos vacios, entonces validar otros elementos
    //2. Validar si los campos se actualizaron, si no se modificaron no hacer nada, mostrar indicador 
    let camposDiferentes = true;
    if(datosPerfilUsuario.primer_nombre !== copiaDatosPerfil.primer_nombre || datosPerfilUsuario.segundo_nombre !== copiaDatosPerfil.segundo_nombre ||
      datosPerfilUsuario.apellidos !== copiaDatosPerfil.apellidos ||datosPerfilUsuario.correo !== copiaDatosPerfil.correo){//Algun campo es diferente
      camposDiferentes = false;
    } 

    //Se actualizo algun campo, revisar si son validos
        
    //3. Validar los campos de nombre para que solo acepten letras y espacion con expresion regular
    let regexNombre = /^[a-zA-ZÑñ][a-zA-ZÑñ\s]*$/;
    //3.1 Primer nombre
    if(datosPerfilUsuario.primer_nombre!== "" && !regexNombre.test(datosPerfilUsuario.primer_nombre)){
      erroresValidacionMP.primer_nombre = "¡El nombre es invalido!";
      validarCamposGuardar = false;
    }
    //3.2 Segundo nombre,verificar que ste vacio
    if(datosPerfilUsuario.segundo_nombre !== "" && !regexNombre.test(datosPerfilUsuario.segundo_nombre)){
      erroresValidacionMP.segundo_nombre = "¡El nombre es invalido!";
      validarCamposGuardar = false;
    }
    //3.3 Apellidos
    if(datosPerfilUsuario.apellidos!== "" &&  !regexNombre.test(datosPerfilUsuario.apellidos)){
      erroresValidacionMP.apellidos = "¡El apellidos(s)  es invalido!";
      validarCamposGuardar = false;
    }
      
    //4. Validar que campo de correo sea valido
    let regex_Correo = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const dominioCorreo = 'comunicartehn.com';
    if(datosPerfilUsuario.correo!== "" && !regex_Correo.test(datosPerfilUsuario.correo)){
      erroresValidacionMP.correo = "¡El correo es invalido!";
      validarCamposGuardar = false;
    } else {
      let correoCaseSensitive = datosPerfilUsuario.correo.toLowerCase();
      if( datosPerfilUsuario.correo !== "" && !correoCaseSensitive.endsWith(`@${dominioCorreo}`)){
        erroresValidacionMP.correo = "Este correo no es de la empresa.";
          validarCamposGuardar = false;       
      } 
    }
      setEroresMP( erroresValidacionMP);
    return validarCamposGuardar;
  }
  return (
    <div className="fondo-pantallaModificacion">
      <div className="caja-centroModificarPerfil">
      <img src="images/Logo_ComunicArte_Final.png" className="comunicarte-logoMP"alt="Logo ComunicArte"/>
      <img src={datosPerfilUsuario.foto_perfil}className="avatarMP Foto_crePerfil"alt="Avatar de usuario"/>
      <button className="botonCambiarFoto">Seleccionar Foto</button>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <TextBoxInput TituloInput="Primer Nombre" name="primer_nombre" valor={datosPerfilUsuario.primer_nombre} 
            onChange = {onChange} errorInput={erroresMP.primer_nombre} onClick={eliminarErrorMP}
            />
          </div>
          <div className="col">
          <TextBoxInput  TituloInput="Segundo Nombre" name="segundo_nombre" 
           onChange = {onChange} errorInput={erroresMP.segundo_nombre} onClick={eliminarErrorMP} valor={datosPerfilUsuario.segundo_nombre}
          />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <TextBoxInput  TituloInput="Apellidos" name="apellidos" valor={datosPerfilUsuario.apellidos}
             onChange = {onChange} errorInput={erroresMP.apellidos} onClick={eliminarErrorMP}
            />
          </div>
          <div className="col">
          <TextBoxInput  TituloInput="Correo" name="correo" valor={datosPerfilUsuario.correo}
           onChange = {onChange}  errorInput={erroresMP.correo} onClick={eliminarErrorMP}
          />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <button type="button" className="botonModificacion" onClick={()=> navigate(-1)}>Volver</button>
          </div>
          <div className="col">
            <button type = "submit" className="botonModificacion">Guardar cambios</button>
          </div>
        </div>
      </form>
      </div>
    </div>
  );
};
export default VentanaModificacion;