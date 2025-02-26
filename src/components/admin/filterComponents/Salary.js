import { useState } from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Slider from '@mui/joy/Slider'
import { useAdminData } from 'contexts/AdminDataContext';

export const Salary = () => {
    const { setSelectedFilters } = useAdminData();
    const [value, setValue] = useState([900, 2800]);

    return (
        <FormControl size="sm">
            <FormLabel sx={{marginBottom: '-0.05rem'}}>Salário</FormLabel>
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
                    width: '10rem'
                }}
                defaultValue={0}
                value={value}
                onChange={(e, newValue) => setValue(newValue)}
                onChangeCommitted={(e, newValue) => 
                    setSelectedFilters((prevFilters) => ({...prevFilters, 'Salário': newValue}))
                }
                min={800}
                max={3000}
                step={10}
                valueLabelFormat={(value) => `${value}€`}
                valueLabelDisplay='auto'
                variant='outlined'
            />
        </FormControl>
    );
};