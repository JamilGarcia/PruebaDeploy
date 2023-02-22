import axios from "axios";
import Swal from 'sweetalert2'

export const obtenerDatoEmpleadoMOD = async (correo, setDatosEmpleado) => {
    try {
        if(correo !== null){
            //https://comunicartewebapp-api.herokuapp.com/
            //http://localhost:5000/Gerente/gestion_perfiles/modificar_perfiles
            const respuesta = await axios.post('https://comunicartewebapp-api.herokuapp.com/Gerente/gestion_perfiles/modificar_perfiles',{correoEmpleado: correo})
                    //console.log(peticionObtenerLista.data);
                 setDatosEmpleado({
                    primer_nombre: respuesta.data.primer_nombre, 
                    segundo_nombre: respuesta.data.segundo_nombre, 
                    apellidos: respuesta.data.apellidos, 
                    correo: respuesta.data.correo,
                    fecha_de_nacimiento: respuesta.data.fecha_de_nacimiento, 
                    fecha_de_inicio: respuesta.data.fecha_de_inicio,
                    puesto_empresa: respuesta.data.puesto_empresa, 
                    estado: respuesta.data.estado
                 });
                 return respuesta.data;
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: '¡Debe seleccionar un empleado!'
            });
        }
        
    } catch (error) {
        console.log("obtener Datos");
        console.log(error);
    }
}