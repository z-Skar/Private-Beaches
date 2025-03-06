import { useEffect, useState } from 'react';
import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel';
import { useAdminData } from 'contexts/AdminDataContext';

export const DateFilter = () => {
    const { setSelectedFilters } = useAdminData();
    const [dateRange, setDateRange] = useState([null, null]);

    useEffect(() => {
        setSelectedFilters((prevFilters) => ({ ...prevFilters, Período: dateRange }));
    }, [dateRange]);

    return (
        <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
            <FormControl size='sm'>
                <FormLabel>Data de Início</FormLabel>
                <Input type='date'
                       size='sm'
                       value={dateRange[0] || ''}
                       onChange={(e) => setDateRange([e.target.value, dateRange[1]])}
                />
            </FormControl>
            <FormControl size='sm'>
            <FormLabel>Data de Fim</FormLabel>
                <Input type='date'
                       size='sm'
                       value={dateRange[1] || ''} 
                       onChange={(e) => setDateRange([dateRange[0], e.target.value])}
                />
            </FormControl>
        </div>
    );
};