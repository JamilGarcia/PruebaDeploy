import { FaFileInvoiceDollar } from "react-icons/fa";
import { FaCashRegister } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { FaArchive } from "react-icons/fa";

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
    }
]