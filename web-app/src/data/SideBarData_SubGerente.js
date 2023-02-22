import { FaFileInvoiceDollar, FaCashRegister, FaUserEdit   } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";

export const SideBarDataSG = [

  {
    title: "Home",
    path: "",
    icon: (props) => <i class="fas fa-home" {...props} />
  },
  {
    title: "Registrar Facturas",
    path: "/Subgerente/registrar_facturas",
    icon: (props) => <FaFileInvoiceDollar {...props} />
  },
  {
    title: "Registro de Activos Fijos",
    path: "/Subgerente/registro_activos_fijos",
    icon: (props) => <FaCashRegister {...props} />
  },
  {
    title: "Gestión de Perfiles",
    path: "/Subgerente/gestion_perfiles",
    icon: (props) => <FaUserEdit {...props} />
  },
  {
    title: "    Manejar Campos Cotizaciones",
    path: "/Subgerente/manejar-campos-cotizaciones",
    icon: (props) => <GiNotebook {...props}/>
  }
]