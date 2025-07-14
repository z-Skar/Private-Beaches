import { useEffect, useState } from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Slider from '@mui/joy/Slider'
import { useAdminData } from 'contexts/AdminDataContext';
import axios from 'axios';

export const ReservationCostFilter = () => {
    const { setSelectedFilters } = useAdminData();
    const [value, setValue] = useState([0, 0]);
    const [MIN_MAX_VALUE, setMIN_MAX_VALUE] = useState([]);

    useEffect(() => {
        const GET_MIN_AND_MAX_RESERVATION_COST = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/beaches/cost`);
                const { MIN_VALUE, MAX_VALUE } = response.data[0];
                setValue([MIN_VALUE, MAX_VALUE]);
                setMIN_MAX_VALUE([MIN_VALUE, MAX_VALUE]);
            } catch (error) {
                console.log('Ocorreu um erro a buscar os valores máximos e minímos do custo de reserva: ', error);
            };
        };
        GET_MIN_AND_MAX_RESERVATION_COST();
    }, []);

    return (
        <FormControl size="sm" sx={{ minWidth: '10rem' }}>
            <FormLabel sx={{marginBottom: '-0.05rem'}}>Custo da Reserva</FormLabel>
            <Slider
                sx={{
                    "--Slider-trackSize": "2rem",
                    ".MuiSlider-rail": {
                        borderRadius: 5,
                        border: '1px solid #e2e8f0',
                    },
                    ".MuiSlider-track": {
                        borderRadius: 5,
                        backgroundColor: '#ff5a00'
                    },
                    ".MuiSlider-thumb": {
                        border: '2px solid #ff5a00',
                        backgroundColor: 'white',
                    },
                }}
                value={value}
                onChange={(e, newValue) => setValue(newValue)}
                onChangeCommitted={(e, newValue) => 
                    setSelectedFilters((prevFilters) => ({...prevFilters, 'Custo de Reserva': newValue}))
                }
                min={MIN_MAX_VALUE[0]}
                max={MIN_MAX_VALUE[1]}
                step={1}
                valueLabelFormat={(value) => `${value}€`}
                valueLabelDisplay='auto'
                variant='outlined'
            />
        </FormControl>
    );
};