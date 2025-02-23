import { useState } from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { useAdminData } from "contexts/AdminDataContext";

export const CountryFilter = () => {
    const { adminData, setSelectedFilters } = useAdminData();
    const [selectedCountry, setSelectedCountry] = useState('all')
    const COUNTRIES = [...new Set(adminData.map(beach => beach.País).filter(pais => pais))];

    return (
        <FormControl size="sm" sx={{ minWidth: '10rem' }}>
            <FormLabel>País</FormLabel>
            <Select
                size="sm"
                placeholder="Todos"
                value={selectedCountry}
                onChange={(e, newValue) => {
                    setSelectedCountry(newValue);
                    setSelectedFilters((prevFilters) => (
                        { ...prevFilters, País: newValue }
                    ))
                }}
            >
                <Option value={'all'}>Todos</Option>
                {COUNTRIES.map(country => (<Option value={country} key={country}>{country}</Option>))}
            </Select>
        </FormControl>
    );
};