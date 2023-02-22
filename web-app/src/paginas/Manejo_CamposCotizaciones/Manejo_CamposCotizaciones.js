import React, { useState } from "react";
import axios from 'axios';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow} from '@mui/material';


const Manejo_CamposCotizaciones = () => {
    
    const [datosCamposCotizaciones, setDatosCamposCotizaciones] = useState([]);
    
    return(
        <section>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Tipo de Servicio</TableCell>
                            <TableCell>Nombre de Servicio</TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>
        </section>
    )
}

export default Manejo_CamposCotizaciones;