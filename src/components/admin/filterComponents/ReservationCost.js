import { useState } from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Slider from '@mui/joy/Slider'

export const ReservationCostFilter = () => {
    const [value, setValue] = useState([50, 950]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                defaultValue={0}
                value={value}
                onChange={handleChange}
                min={0}
                max={1000}
                step={1}
                valueLabelFormat={(value) => `${value}€`}
                valueLabelDisplay='auto'
                variant='outlined'
            />
        </FormControl>
    );
};