import React from 'react'
import { Input } from '@mui/joy';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import { NumericFormat } from 'react-number-format';

export const ReservationCostFilter = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', gap: '0,5rem'}}>
            <FormControl size="sm">
                <FormLabel sx={{ textAlign: 'center' }}>Custo da Reserva</FormLabel>
                <Input size="sm" placeholder="Custo minímo" 
                    slotProps={{
                        input: {
                            component: NumericFormat,
                            maxLength: 4,
                        }
                    }}
                    startDecorator={'€'}
                    sx={{ width: "10rem" }}
                />
            </FormControl>
            <FormControl size="sm" 
                sx={{ paddingTop: '1.5rem' /*Padding utilizado para alinhas o input d custo máximo ao input do custo minímo. */}}>
                <Input size="sm" placeholder="Custo minímo" 
                    slotProps={{
                        input: {
                            component: NumericFormat,
                            maxLength: 4,
                        }
                    }}
                    startDecorator={'€'}
                    sx={{ width: "10rem" }}
                />
            </FormControl>
        </div>
    );
};