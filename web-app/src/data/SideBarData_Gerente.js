import { FaFileInvoiceDollar,  FaCashRegister, FaUserEdit, FaArchive  } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";

export const SideBarDataG = [

    {
        title: "Home",
        path: "",
        icon: (props) => <i class="fas fa-home" {...props} />
    },
    {
        title: "    Generar Factura",
        path: "/Gerente/generar_factura",
        icon: (props) => <FaFileInvoiceDollar {...props} />
    },
    {
        title: "    Flujo de Efectivo",
        path: "/Gerente/flujo_efectivo",
        icon: (props) => <FaCashRegister {...props} />
    },
    {
        title: "    Gestión de Perfiles",
        path: "/Gerente/gestion_perfiles/crear_perfil",
        icon: (props) => <FaUserEdit {...props}/>
    },
    {
        title: "    Registro de Activos Fijos",
        path: "/Gerente/registro_activos_fijos",
        icon: (props) => <FaArchive {...props}/>
    },
    {
        title: "    Manejar Campos Cotizaciones",
        path: "/Gerente/manejar-campos-cotizaciones",
        icon: (props) => <GiNotebook {...props}/>
    }
]