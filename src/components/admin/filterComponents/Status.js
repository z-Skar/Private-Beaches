import { useState } from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { useAdminData } from "contexts/AdminDataContext";

export const StatusFilter = () => {
    const [status, setStatus] = useState('all');
    const { setSelectedFilters, adminData } = useAdminData();
    const STATUS = [ ...new Set(adminData.map(lifeguard => lifeguard.Estado).filter(stat => stat))];

    return (
        <FormControl size="sm">
            <FormLabel>Estado</FormLabel>
            <Select
                size="sm"
                placeholder="Todos"
                sx={{ width: '10rem' }}
                value={status}
                onChange={(e, newValue) => {
                    setStatus(newValue);
                    setSelectedFilters((prevFilters) => ({ ...prevFilters, Estado: newValue }))
                }}
            >
                <Option value="all">Todos</Option>
                {STATUS.map(stat => (<Option value={stat} key={stat}>{stat}</Option>))}
            </Select>
        </FormControl>
    );
};