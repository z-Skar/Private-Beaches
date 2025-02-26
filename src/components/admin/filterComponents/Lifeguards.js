import { useState } from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { useAdminData } from "contexts/AdminDataContext";

export const LifeguardsFilter = () => {
    const { adminData, setSelectedFilters } = useAdminData();
    const [selectedLifeguard, setSelectedLifeguard] = useState('all');
    const LIFEGUARDS = [...new Set(adminData.map(beach => beach["Salva-Vidas"]).filter(lifeguard => lifeguard))];

    return (
        <FormControl size="sm" sx={{ minWidth: '10rem' }}>
            <FormLabel>Salva-vidas</FormLabel>
            <Select
                size="sm"
                placeholder="Todos"
                value={selectedLifeguard}
                onChange={(e, newValue) => {
                    setSelectedLifeguard(newValue);
                    setSelectedFilters((prevFilters) => ({...prevFilters, "Salva-Vidas": newValue}))
                }}  
            >
                <Option value="all">Todos</Option>
                {LIFEGUARDS.map(lifeguard => (<Option value={lifeguard} key={lifeguard}>{lifeguard}</Option>))}
            </Select>
        </FormControl>
    );
};