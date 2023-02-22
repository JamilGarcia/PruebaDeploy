
import axios from "axios";

export const columnasListadoEmpleados = [
    {heading: 'Nombre', value:'nombreusuario'},
    {heading: 'Correo', value:'correo'},
    {heading: 'Estado', value: 'estado'}
]

/*Funcion para obtener datos de la lista de empleados*/ 
export const obtenerListaEmpleados = async(setDatosTablaEmpleados) => {
    try {
        //http://localhost:5000/Gerente/gestion_perfiles/modificar_perfiles
        const peticionObtenerLista = await axios.get('https://comunicartewebapp-api.herokuapp.com/Gerente/gestion_perfiles/modificar_perfiles')
        .then(respuesta =>{
            //console.log(respuesta.data);
            setDatosTablaEmpleados(respuesta.data);
        } );
    } catch (error) {
        console.log(error);
    }
}