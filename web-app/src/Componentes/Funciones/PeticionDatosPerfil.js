
export const obtenerDatosPerfil = async (ventanaActual, correoUsuario, setDatosPerfilUsuario, setCopiaDatosPerfil) => {
    const body = {correo: correoUsuario};

    if(correoUsuario != null){
        try {
            //https://comunicartewebapp-api.herokuapp.com/
            const respuesta = await fetch(
                `https://comunicartewebapp-api.herokuapp.com/${ventanaActual}`,
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body)
                }
            ).then((respuesta) => respuesta.json()).then((data) =>{
                //Hacer set a base de ventana actual
                /*Ventana de Modificar Perfil */
                console.log(data.foto_perfil);
                setDatosPerfilUsuario({
                    primer_nombre: data.primer_nombre,
                    segundo_nombre: data.segundo_nombre,
                    apellidos: data.apellidos,
                    correo: data.correo,
                    foto_perfil: data.foto_perfil
                });
                setCopiaDatosPerfil({
                    primer_nombre: data.primer_nombre,
                    segundo_nombre: data.segundo_nombre,
                    apellidos: data.apellidos,
                    correo: data.correo
                });
            });
        } catch(error){
            console.log(error);
        }
    }
    
}