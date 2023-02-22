import { Route, Routes } from 'react-router-dom';
import React from 'react';

import LoginScreen from './paginas/Login/LoginScreen';
import HomeGerente from './paginas/Home_Gerente/HomeGerente';

import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './context/ProtectedRoute';

import SubgerenteScreen from './paginas/Home_Subgerente/HomeSubgerente';
import VerPerfil from './paginas/Ver_Perfil/VerPerfil';
import EjecutivoScreen from './paginas/Home_EjecutivoCuenta/HomeEjecutivoCuenta';
import FlujoEfectivo from './paginas/Home_Gerente/FlujoEfectivo';
import GestionarPerfilesCE from './paginas/Home_Gerente/GestionarPerfilesCE';
import GestionarPerfilesMOD from './paginas/Home_Gerente/GestionarPerfilesMOD';
import GestionarPerfilesEL from './paginas/Home_Gerente/GestionarPerfilesEL';
import RegistrarFacturasSubG from './paginas/Home_Subgerente/RegistrarFacturasSubG';
import RegistroActivosFijos_SubG from './paginas/Home_Subgerente/RegistroActivosFijos_SubG';
import GestionarPerfilSubG from './paginas/Home_Subgerente/GestionPerfilSubG';
import Facturacion from './paginas/Home_EjecutivoCuenta/Facturacion';
import Cotizacion from './paginas/Home_EjecutivoCuenta/Cotizacion';
import VentanaModificacion from './paginas/Modificar_Perfil/VentanaModificacion';
import { GlobalProvider } from './context/GlobalProvider';
import HomeSection from './Componentes/HomeSection/HomeSection';
import { SideBarDataEC } from "./data/SideBarData_EjecutivoCuenta";
import { SideBarDataSG } from './data/SideBarData_SubGerente';
import { SideBarDataG } from './data/SideBarData_Gerente';
import EnConstruccion from './paginas/EnConstruccion';
// import GenerarFactura from './paginas/Home_Gerente/GenerarFactura';
// import RegistroActivosFijos from './paginas/Home_Gerente/RegistroActivosFijos';
// import CreateEmpleado from './paginas/Home_Gerente/CreateEmpleado';
// import Minimenu from './paginas/Home_Gerente/MiniMenu';
import ListarCotizaciones from './paginas/Home_EjecutivoCuenta/ListarCotizaciones'
import ModificarFacturaSG from './paginas/Home_Subgerente/ModificarFacturaSG';


function App() {
  return (
    <AuthProvider>
      <GlobalProvider>
        <Routes>
          <Route path="/" element={<LoginScreen />} />

          <Route element={<ProtectedRoute />} >
            <Route path="/Gerente" element={<HomeGerente />} >
              <Route index element={<HomeSection DataSidebar={SideBarDataG} />} />

              <Route path="generar_factura" element={<EnConstruccion />} />
              <Route path="flujo_efectivo" element={<FlujoEfectivo />} />
              <Route path="gestion_perfiles" element={<GestionarPerfilesCE />} />
              <Route path="gestion_perfiles/crear_perfil" element={<GestionarPerfilesCE />} />
              <Route path="gestion_perfiles/modificarEliminar_perfil" element={<GestionarPerfilesMOD />} />
              <Route path="gestion_perfiles/eliminar_perfil" element={<GestionarPerfilesEL />} />
              <Route path="registro_activos_fijos" element={<EnConstruccion />} />
            </Route>

            <Route path="/Subgerente" element={<SubgerenteScreen />} >
              <Route index element={<HomeSection DataSidebar={SideBarDataSG} />} />

              <Route path="registrar_facturas" element={<ModificarFacturaSG />} />
              <Route path="registro_activos_fijos" element={<EnConstruccion />} />
              <Route path="gestion_perfiles" element={<EnConstruccion />} />
            </Route>

            <Route path="/Ejecutivo_Cuenta" element={<EjecutivoScreen />} >
              <Route index element={<HomeSection DataSidebar={SideBarDataEC} />} />

              <Route path="facturacion" element={<EnConstruccion />} />
              <Route path="cotizacion" element={<Cotizacion />} />
              <Route path = "cotizacion/ListarCotizaciones" element={<ListarCotizaciones />} /> 
            </Route>
            <Route path="/perfil_usuario" element={<VerPerfil />} />
            <Route path="/modificar_perfil" element={<VentanaModificacion />} />
            {/*<Route path = "/descripcion_tabla" element={< DescripcionTablaFlujoEfectivo />} />*/}
          </Route>
        </Routes>
      </GlobalProvider>
    </AuthProvider>
  );
}

export default App;