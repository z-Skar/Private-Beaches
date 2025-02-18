import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel';

export const DateFilter = () => (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
        <FormControl size='sm'>
            <FormLabel>Data de Início</FormLabel>
            <Input type='date' size='sm' />
        </FormControl>
        <FormControl size='sm'>
        <FormLabel>Data de Fim</FormLabel>
            <Input type='date' size='sm' />
        </FormControl>
    </div>
);