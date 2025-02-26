import { useEffect, useState } from 'react';
import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel';
import { useAdminData } from 'contexts/AdminDataContext';
import { dateCalendarClasses } from '@mui/x-date-pickers';

export const DateFilter = () => {
    const DATE = new Date();
    const CURRENT_DATE = `${DATE.getFullYear()}-${DATE.getMonth()}-${DATE.getDay()}`;

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState(CURRENT_DATE || '1970-01-01');

    useEffect(() => {
        console.log('endDate', endDate);
    }, [startDate, endDate]);

    return (
        <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
            <FormControl size='sm'>
                <FormLabel>Data de nascimento</FormLabel>
                <Input type='date' size='sm' />
            </FormControl>
            <FormControl size='sm'>
            <FormLabel>Data de Fim</FormLabel>
                <Input type='date'
                       size='sm'
                       value={endDate || CURRENT_DATE} 
                       onChange={(e, newValue) => setEndDate(newValue)}
                />
            </FormControl>
        </div>
    );
};