import { useState } from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { useAdminData } from "contexts/AdminDataContext";

export const ServicesFilter = () => {
    const { adminData, setSelectedFilters } = useAdminData();
    const [selectedServiceType, setSelectedServiceType] = useState('all')
    const SERVICE_TYPES = [...new Set(adminData.map(beach => beach.Serviço).filter(service => service))];

    return (
        <FormControl size="sm" sx={{ minWidth: '10rem' }}>
            <FormLabel>Tipo de Serviço</FormLabel>
            <Select
                size="sm"
                placeholder="Todos"
                value={selectedServiceType}
                onChange={(e, newValue) => {
                    setSelectedServiceType(newValue);
                    setSelectedFilters((prevFilters) => ({...prevFilters, Serviço: newValue}))
                }}
            >
                <Option value="all">Todos</Option>
                {SERVICE_TYPES.map(service => (<Option value={service} key={service}>{service}</Option>))}
            </Select>
        </FormControl>
    );
};