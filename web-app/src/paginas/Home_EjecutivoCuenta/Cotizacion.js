import React, { useState, useEffect } from "react";
import '../../assets/hojas-de-estilo/Cotizacion.css';
import Swal from 'sweetalert2'

// import html2pdf from 'html2pdf.js'

import html2pdf from 'html2pdf.js'
import Minimenu from "./MiniMenuCotizaciones";
const Cotizacion = () => {

  const [NuevaCoti, setNuevaCoti] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);
  const [Cotizaciones, setCotizaciones] = useState([]);
  console.log(Cotizaciones);
  const [formErros, setFormErros] = useState({
    Estado: "Inicial"
  });

  useEffect(() => {
    if (Object.keys(formErros).length === 0) {
      createFile();
    }
  }, [formErros]);

  const createFile = () => {
    if (Object.keys(formErros).length === 0) {
      const actuales_newCoti = {
        Cliente: NuevaCoti.Cliente,
        Tipo_de_Servicio: NuevaCoti.Tipo_de_Servicio,
        Nombre_Servicio: NuevaCoti.Nombre_Servicio,
        Cantidad: NuevaCoti.Cantidad,
        Detalle: NuevaCoti.Detalle,
        Precio_Unitario: NuevaCoti.Precio_Unitario
      }

      setCotizaciones([...Cotizaciones, actuales_newCoti]);

      var table = document.getElementById('mytable');


      var row = `<tr id= "DATA_COTIS">
                      <td>${NuevaCoti.Tipo_de_Servicio}</td>
                      <td>${NuevaCoti.Nombre_Servicio}</td>
                      <td>${NuevaCoti.Cantidad}</td>
                      <td>${NuevaCoti.Detalle}</td>
                      <td>${NuevaCoti.Precio_Unitario}</td>

                    </tr>`
      table.innerHTML += row

    }
    let n_cliente = NuevaCoti.Cliente;
    setFormErros({ Estado: "Inicial" });
    setNuevaCoti({});
    setNuevaCoti({ ...NuevaCoti, 'Cliente': n_cliente });
    let inputs = document.getElementsByClassName('form-control-coti');

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = "";;
    }
    document.getElementsByClassName('form-textarea-coti')[0].value = "";
    document.getElementById('Cliente_input').value = n_cliente;
    setIsDisabled(true);
  }

  const quitarMensajeError = (e) => {
    console.log(e.target.name);
    setFormErros({ ...formErros, [e.target.name]: '' });
  }

  const handleChange = (e) => {
    setNuevaCoti({ ...NuevaCoti, [e.target.name]: e.target.value });
  };

  const InsertCotizacion = async () => {
    if (Cotizaciones.length > 0) {
      const body = Cotizaciones;
      const respuesta = await fetch('https://comunicartewebapp-api.herokuapp.com/crear_cotizacion', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      }).then((respuesta) => respuesta.json()).then((data) => {
        if (data.status === "success") {
          var element = document.getElementById('table-container');
          let cotizacionHeaderEl = document.getElementById('cotizacion-header')
          cotizacionHeaderEl.classList.toggle('no-display');
          // html2pdf().from(element).save('cotización.pdf').then(() => {
          //   cotizacionHeaderEl.classList.toggle('no-display');
          //   Swal.fire({
          //     icon: 'success',
          //     title: 'Operación Exitosa',
          //     text: 'Creacion de Cotizaciones Exitosa',
          //     timer: 1500,
          //   })
          //  // window.location.reload();
          // });
          html2pdf().from(element).save('cotización.pdf').then(() => {
            cotizacionHeaderEl.classList.toggle('no-display');
            Swal.fire({
              icon: 'success',
              title: 'Operación Exitosa',
              text: 'Creacion de Cotizaciones Exitosa',
              timer: 1500,
            })
           // window.location.reload();
          });

        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrio un error al crear un nueva Cotizacion'
          })
        }
      });

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Tabla vacia',
        text: 'Cree Cotizacion'
      })

    }


  };
  const validate = () => {
    const erros_coti = {}

    if (!NuevaCoti.Cliente) {
      erros_coti.Cliente = "Ingrese Cliente";
    }

    if (!NuevaCoti.Tipo_de_Servicio) {
      erros_coti.Tipo_de_Servicio = "Ingrese Tipo de Servicio";
    }
    if (!NuevaCoti.Nombre_Servicio) {
      erros_coti.Nombre_Servicio = "Nombre Servicio";
    }
    if (!NuevaCoti.Cantidad) {
      erros_coti.Cantidad = "Ingrese Cantidad";
    }
    if (!NuevaCoti.Detalle) {
      erros_coti.Detalle = "Ingrese Detalle";
    }
    if (!NuevaCoti.Precio_Unitario) {
      erros_coti.Precio_Unitario = "Ingrese Precio Unitario";
    }

    setFormErros(erros_coti)

  }

  const dateCotizacion = () => {
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-HN', options);
  }

  return (
    <div className="fondo-pantalla-coti">
      <h1 className="Titulocoti">Cotizacion</h1>
      <Minimenu/>
      <div className="CuadroCentrado-coti">
        <div className="secionEntradas-coti">
          <div className="formSpace-coti">
            <label for="" className="form-label-coti" >Cliente</label>
            <input type="text" className="form-control-coti" id='Cliente_input'
              name="Cliente"
              disabled={isDisabled}
              onChange={e => handleChange(e)}
              onClick={quitarMensajeError}
            />
            <p className="mensaje_error-coti">{formErros.Cliente}</p>
          </div>

          <div className="formSpace-coti">
            <label for="" className="form-label-coti">Tipo de Servicio</label>
            <input type="text" className="form-control-coti"
              name="Tipo_de_Servicio"
              onChange={e => handleChange(e)}
              onClick={quitarMensajeError}
            />
            <p className="mensaje_error-coti"> {formErros.Tipo_de_Servicio} </p>
          </div>

          <div className="formSpace-coti">
            <label for="" className="form-label-coti">Nombre de Servicio</label>
            <input type="text" className="form-control-coti"
              name="Nombre_Servicio"
              onChange={e => handleChange(e)}
              onClick={quitarMensajeError}
            />
            <p className="mensaje_error-coti">{formErros.Nombre_Servicio}</p>
          </div>
          <div className="formSpace-coti">
            <label for="" className="form-label-coti">Cantidad</label>
            <input type="number" className="form-control-coti"
              name="Cantidad" min={1} pattern={"^[0-9]+$"}
              onChange={e => handleChange(e)}
              onClick={quitarMensajeError}
            />
            <p className="mensaje_error-coti">{formErros.Cantidad}</p>
          </div>

          <div className="formSpace-coti">
            <label for="" className="form-label-coti">Detalle</label>
            <textarea type="text" className="form-textarea-coti"
              name="Detalle"
              onChange={e => handleChange(e)}
              onClick={quitarMensajeError}
            />
            <p className="mensaje_error-coti">{formErros.Detalle}</p>
          </div>

          <div className="formSpace-coti">
            <label for="" className="form-label-coti">Precio Unitario</label>
            <input type="number" className="form-control-coti"
              name="Precio_Unitario" min={1} step={0.01}
              onChange={e => handleChange(e)}
              onClick={quitarMensajeError}

            />
            <p className="mensaje_error-coti">{formErros.Precio_Unitario}</p>
          </div>


        </div>
        <div className="seccion_info">
          <div className="scrollit-coti ">
            <div id="table-container" className="table-container">
              <div id="cotizacion-header" className="table-info no-display">
                <img className="comunicarte-logo" alt="comunicarte logo" src="/images/Logo_ComunicArte_Final.png" />
                <div className="cotizacion-title">COTIZACIÓN</div>
                <div className="title-text">
                  Cliente:
                  <div className="property-text">
                    {Cotizaciones?.[0]?.Cliente}
                  </div>
                </div>
                <div className="title-text">
                  Fecha:
                  <div className="property-text">
                    {dateCotizacion()}
                  </div>
                </div>
              </div>
              <table
                id="mytable"
                class="table table-striped table-coti"
                data-toggle="table"
                data-url="data3.json"
              >
                <thead>
                  <tr>
                    <th scope="col">Tipo de Servicio</th>
                    <th scope="col">Nombre de Servicio</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Detalle</th>
                    <th scope="col">Precio Unitario</th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
          <div className="BotonesCotizacion">
            <button className="btn btn-outline-secondary  Boton_config_coti" type='submit' onClick={validate}>Agregar</button>
            <button className="btn btn-outline-secondary  Boton_config_coti" type='submit' onClick={InsertCotizacion} >Cotizar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cotizacion;