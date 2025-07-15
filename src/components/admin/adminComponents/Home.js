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
    const NUMBER_OF_BEACHES = adminData?.[0]?.['Número de Praias'] ?? DEFAULT_MESSAGE;
    const NUMBER_OF_LIFEGUARDS = adminData?.[0]?.['Número de Salva-vidas'] ?? DEFAULT_MESSAGE;
    const NUMBER_OF_BEACHES_WITHOUT_LIFEGUARDS = adminData?.[0]?.['Praias sem Salva-vidas'] ?? DEFAULT_MESSAGE;
    const MONTHLY_RESERVATIONS = adminData?.[0]?.['Reservas Mensais'] ?? DEFAULT_MESSAGE;
    const LAST_PAYMENT = adminData?.[0]?.['Último pagamento'] ?? DEFAULT_MESSAGE;
    const LAST_EVALUATION = adminData?.[0]?.['Última avaliação'] + ' (' + adminData?.[0]?.['Praia da última avaliação']  + ')'?? DEFAULT_MESSAGE;

    const CONTAINER = {
        maxWidth: '1600px',
        height: '100vh',
        padding: '24px',
        fontFamily: 'Arial, sans-serif',
    };

    const GRID = {
        display: 'grid',
        justifyContent: 'space-between',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
    };

    const CARD = {
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid #eee',
        maxWidth: '30rem'
    };

    const VALUE = {
        fontSize: '28px',
        fontWeight: 'bold',
        marginBottom: '6px',
    };

    const LABEL = {
        color: '#666666',
        fontSize: '16px',
    };

    return (
        <>
            <div style={CONTAINER}>
                <div style={GRID}>
                    <div style={CARD}>
                        <div style={{...VALUE, color: '#3b82f6' }}>{NUMBER_OF_CLIENTS}</div>
                        <div style={LABEL}>Número Total de Clientes</div>
                    </div>
                    <div style={CARD}>
                        <div style={{...VALUE, color: '#22c55e'}}>{TOTAL_PROFIT}</div>
                        <div style={LABEL}>Lucro Total</div>
                    </div>
                    <div style={CARD}>
                        <div style={{...VALUE, color: '#f97316'}}>{NUMBER_OF_BEACHES}</div>
                        <div style={LABEL}>Número de Praias</div>
                    </div>
                    <div style={CARD}>
                        <div style={{...VALUE, color: '#ef4444'}}>{NUMBER_OF_LIFEGUARDS}</div>
                        <div style={LABEL}>Número de Salva-vidas ativos</div>
                    </div>
                </div>
            </div>
            <Typography level="h2" component="h1" sx={{marginTop: '24px'}}>Atividade Recente</Typography>
            <div style={CONTAINER}>
                <div style={GRID}>
                    <div style={CARD}>
                        <div style={{...VALUE, color: '#f97316' }}>{MONTHLY_RESERVATIONS}</div>
                        <div style={LABEL}>Número de reservas este mês</div>
                    </div>
                    <div style={CARD}>
                        <div style={{...VALUE, color: '#22c55e'}}>{LAST_PAYMENT}</div>
                        <div style={LABEL}>Valor do último pagamento efetuado</div>
                    </div>
                    <div style={CARD}>
                        <div style={{...VALUE, color: '#3b82f6'}}>{LAST_EVALUATION}</div>
                        <div style={LABEL}>Valor da última avaliação</div>
                    </div>
                </div>
            </div>
            <Typography level="h2" component="h1" sx={{marginTop: '24px'}}>Alertas</Typography>
            <div style={CONTAINER}>
                <div style={GRID}>
                    <div style={CARD}>
                        <div style={{...VALUE, color: '#3b82f6' }}>{NUMBER_OF_BEACHES_WITHOUT_LIFEGUARDS}</div>
                        <div style={LABEL}>Praias sem Salva-vidas</div>
                    </div>
                    <div style={CARD}>
                        <div style={{...VALUE, color: '#ef4444' }}>{PENDENT_LIFEGUARDS}</div>
                        <div style={LABEL}>Candidaturas de Salva-vidas pendentes</div>
                    </div>
                </div>
            </div>
        </>
    );
};