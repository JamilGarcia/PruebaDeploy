

export const validarCamposModificarPerfilEmpleado = (datosEmpleado, setFormErrorsMod) => {
    
    let erroresValidacionMP = {
        primer_nombre: "", segundo_nombre: "", apellidos: " ", correo: " ",
        fecha_de_nacimiento: "", fecha_de_inicio: "", puesto_empresa: "", estado: ""
    }
    let validarCamposGuardar = true;
    let regexNombre = /^[a-zA-ZÑñ][a-zA-ZÑñ\s]*$/;
    //1. Validar campos vacios
    //1.1 Primer nombre
    if(datosEmpleado.primer_nombre === ""){
        erroresValidacionMP.primer_nombre = "¡Falta primer nombre!";
        validarCamposGuardar = false;
    } else {
        //Validar que sea un nombre valido
        if(!regexNombre.test(datosEmpleado.primer_nombre)){
            erroresValidacionMP.primer_nombre = "¡El nombre es invalido!";
            validarCamposGuardar = false;
        }
    }

    //Segundo nombre regex
    if(datosEmpleado.segundo_nombre !== "" && !regexNombre.test(datosEmpleado.segundo_nombre)){
        erroresValidacionMP.segundo_nombre = "¡El nombre es invalido!"
        validarCamposGuardar = false;
    }
      //1.2 Apellidos
    if(datosEmpleado.apellidos === ""){
        erroresValidacionMP.apellidos = "¡Falta apellidos!";
        validarCamposGuardar = false;
    } else {
        if(!regexNombre.test(datosEmpleado.apellidos)){
            erroresValidacionMP.apellidos = "¡El apellido es invalido!";
            validarCamposGuardar = false;
        }
    }
      //1.3 Correo
    if(datosEmpleado.correo === ""){
        erroresValidacionMP.correo = "¡Falta correo!";
        validarCamposGuardar = false;
    } else {
        let regex_Correo = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if(!regex_Correo.test(datosEmpleado.correo)){
            erroresValidacionMP.correo = "¡El correo es invalido!";
            validarCamposGuardar = false;
        }
    }

    //1.4 Fecha de Nacimiento
    if(datosEmpleado.fecha_de_nacimiento === ""){
        erroresValidacionMP.fecha_de_nacimiento = "¡Falta fecha de nacimiento!"
        validarCamposGuardar = false;
    } else {
        let date_birth = new Date(datosEmpleado.fecha_de_nacimiento) ;
            let today = new Date();
            let years = -date_birth.getFullYear() + today.getFullYear();
            
            if(years > 17){
                if(years === 18){
                    if( today.getMonth() < date_birth.getMonth()){
                        erroresValidacionMP.fecha_de_nacimiento = "¡Fecha Invalida!";   
                        validarCamposGuardar = false; 
                    }
                }
            }else{
                erroresValidacionMP.fecha_de_nacimiento = "¡Fecha Invalida!";
                validarCamposGuardar = false;
            }
    }
    //1.5 Fecha de Inicio
    if(datosEmpleado.fecha_de_inicio === ""){
        erroresValidacionMP.fecha_de_inicio = "¡Falta fecha de inicio!"
        validarCamposGuardar = false;
    } else {
        let date_start = new Date(datosEmpleado.fecha_de_inicio);
        let today = new Date();
        if(date_start.getFullYear() < 2006 || date_start.getFullYear() > today.getFullYear() ){
            erroresValidacionMP.fecha_de_inicio = "Fecha Invalida";
            validarCamposGuardar = false;
        }
    }

    //1.6 Validar puesto empresa
    if(datosEmpleado.puesto_empresa === "false"){
        erroresValidacionMP.puesto_empresa = "¡Falta puesto de empresa!";
        validarCamposGuardar = false;
    }
    setFormErrorsMod(erroresValidacionMP);
    return validarCamposGuardar;

}
