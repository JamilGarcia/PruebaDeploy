

export const obtenerNombreUsuario = async (datosUsuario, setNombreUsuario , setFoto) => {
    try {
        const {correo_usuario, posicion_Usuario} = datosUsuario;
        console.log(correo_usuario);
        const body = {correo: correo_usuario};
        //`https://comunicartewebapp-api.herokuapp.com/${posicion_Usuario}`
        //`http://localhost:5000/${posicion_Usuario}`
        const respuesta = await fetch(
          `https://comunicartewebapp-api.herokuapp.com/${posicion_Usuario}`,{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        ).then((respuesta) => respuesta.json()).then((data) => {setNombreUsuario(data.nombreusuario)  
              if(setFoto !== null){

                  console.log(data)
                  setFoto(data.foto_perfil)
              }
        }) ;
        // setNombreUsuario(data.nombreusuario)
        
      } catch (error) {
        console.log(error);
      }
}