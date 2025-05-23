import { useState } from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Slider from '@mui/joy/Slider'
import { useAdminData } from 'contexts/AdminDataContext';

export const RatingFilter = () => {
    const { setSelectedFilters } = useAdminData();
    const [value, setValue] = useState([0, 5]);
    return (
        <FormControl size="sm" sx={{ minWidth: '10rem' }}>
            <FormLabel sx={{marginBottom: '-0.05rem'}}>Avaliação</FormLabel>
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
                onChange={(e, newValue) => setValue(newValue)}
                onChangeCommitted={(e, newValue) => 
                    setSelectedFilters((prevFilters) => ({...prevFilters, 'Avaliação': newValue}))
                }
                min={0}
                max={5}
                step={0.1}
                valueLabelFormat={(value) => `${value}★`}
                valueLabelDisplay='auto'
                variant='outlined'
            />
        </FormControl>
    );
};