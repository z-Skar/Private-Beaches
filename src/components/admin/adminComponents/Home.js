import Box from '@mui/material/Box';
import Card from '@mui/joy/Card';
import { useAdminData } from "contexts/AdminDataContext";
import { Typography } from '@mui/joy';
import { useEffect } from 'react';

export default function Home() {
    const { adminData, setAdminEntity } = useAdminData();
    
    useEffect(() => {
        setAdminEntity('home');
    }, []);

    const DEFAULT_MESSAGE = 'A carregar dados...';
    const TOTAL_PROFIT = adminData?.[0]?.['Lucro Total'] ?? DEFAULT_MESSAGE;
    const NUMBER_OF_CLIENTS = adminData?.[0]?.['Número de Clientes'] ?? DEFAULT_MESSAGE;
    const PENDENT_LIFEGUARDS = adminData?.[0]?.['Salva-vidas pendentes'] ?? DEFAULT_MESSAGE;

    const CARD_STYLE = {
        backgroundColor: '#F0F4F8',
        width: '18rem',
        height: '10rem',
    };
    
    const DATA_STYLE = {
        fontSize: '1.5rem',
        color: '#FF5A00',
        marginBottom: '-1rem'
    };

    return (
        <Box sx={{ padding: '10px', borderRadius: '10px', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <Card sx={CARD_STYLE}>
            <Typography variant="h2" sx={DATA_STYLE}>{NUMBER_OF_CLIENTS} mil</Typography>
                Número Total de Clientes
            </Card>
            <Card sx={CARD_STYLE}>
                <Typography variant="h2" sx={DATA_STYLE}>{TOTAL_PROFIT}</Typography>
                Lucro Total
            </Card>
            <Card sx={CARD_STYLE}>
            <Typography variant="h2" sx={DATA_STYLE}>{PENDENT_LIFEGUARDS}</Typography>
                Candidaturas de Salva-vidas pendentes
            </Card>
            <Card sx={CARD_STYLE}>
                <Typography variant="h2" sx={DATA_STYLE}>10</Typography>
                Praias
            </Card>
        </Box>
    );
};