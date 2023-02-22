import { BsFillCartCheckFill } from "react-icons/bs";
import { BsFillChatLeftQuoteFill } from "react-icons/bs";

export const SideBarDataEC = [

    {
        title: "Home",
        path: "",
        icon: (props) => <i class="fas fa-home" {...props} />
    },
    {
        title: "Facturación",
        path: "/Ejecutivo_cuenta/facturacion",
        icon: (props) => <BsFillCartCheckFill {...props} />
    },
    {
        title: "Cotización",
        path: "/Ejecutivo_cuenta/cotizacion",
        icon: (props) => <BsFillChatLeftQuoteFill {...props} />
    },
]