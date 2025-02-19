import { useState } from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Slider from '@mui/joy/Slider'

export const TotalBillFilter = () => {
    const [value, setValue] = useState([0, 50000]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <FormControl size="sm" sx={{ marginBottom: '-0.6rem', width: '100%'}}>
            <FormLabel>Pesquisa por pagamentos efetuados</FormLabel>
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
                max={50000}
                step={100}
                valueLabelFormat={(value) => `${value}€`}
                valueLabelDisplay='auto'
                variant='outlined'
            />
        </FormControl>
    );
};