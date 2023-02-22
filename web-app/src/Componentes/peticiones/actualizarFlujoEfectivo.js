import axios from "axios";

export const actualizarDescripcion_Categoria = async (registroEstadoCuenta, cambioDescripcion, cambioCategoria) => {
    try {
        const respuesta = await axios.put("http://localhost:5000/Gerente/flujo-efectivo/agregar-descripcion-categoria", {
            no_de_referencia: registroEstadoCuenta,
            nuevaDescripcion: cambioDescripcion,
            nuevaCategoria: cambioCategoria
        });
        return respuesta.data;
    } catch (error) {
        console.log(error);
        return "Error-Backend";
    }
}