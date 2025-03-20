import Box from '@mui/material/Box';
import Card from '@mui/joy/Card';
import { useAdminData } from "contexts/AdminDataContext";
import { Typography } from '@mui/joy';

export default function Home() {
    const { adminData } = useAdminData();

    const DEFAULT_MESSAGE = 'A carregar dados...';
    const TOTAL_PROFIT = adminData?.[0]?.['Lucro Total'] ?? DEFAULT_MESSAGE;
    const NUMBER_OF_CLIENTS = adminData?.[0]?.['Número de Clientes'] ?? DEFAULT_MESSAGE;
    const PENDENT_LIFEGUARDS = adminData?.[0]?.['Salva-vidas pendentes'] ?? DEFAULT_MESSAGE;

    const CARD_STYLE = {
        backgroundColor: '#F0F4F8'
    };
    
    return (
        <Box sx={{ padding: '10px', borderRadius: '10px', display: 'flex', gap: '1rem' }}>
            <Card sx={CARD_STYLE}>
                <Typography variant="h2">Lucro Total</Typography>
                {TOTAL_PROFIT}
            </Card>
            <Card sx={CARD_STYLE}>
            <Typography variant="h2">Número Total de Clientes</Typography>
                {NUMBER_OF_CLIENTS}
            </Card>
            <Card sx={CARD_STYLE}>
            <Typography variant="h2">Candidaturas de Salva-vidas pendentes</Typography>
                {PENDENT_LIFEGUARDS}
            </Card>
        </Box>
    );
};