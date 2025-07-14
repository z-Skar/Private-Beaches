import { useState } from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { useAdminData } from "contexts/AdminDataContext";

export const PermissionFilter = () => {
    const { adminData, setSelectedFilters } = useAdminData();
    const [selectedPermission, setSelectedPermission] = useState('all')
    const PERMISSIONS = [ ...new Set(adminData.map(client => client['Permissão']).filter(permission => permission))];
    return (
        <FormControl size="sm" sx={{ minWidth: '10rem' }}>
            <FormLabel>Permissão</FormLabel>
            <Select
                size="sm"
                placeholder="Todos"
                value={selectedPermission}
                onChange={(e, newValue) => {
                    setSelectedPermission(newValue);
                    setSelectedFilters((prevFilters) => (
                        { ...prevFilters, Permissão: newValue }
                    ))
                }}
            >
                <Option value={'all'}>Todos</Option>
                {PERMISSIONS.map(permission => (<Option value={permission} key={permission}>{permission}</Option>))}
            </Select>
        </FormControl>
    );
};