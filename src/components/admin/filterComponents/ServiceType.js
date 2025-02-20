import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { useAdminData } from "contexts/AdminDataContext";

export const ServicesFilter = () => {
    const { adminData } = useAdminData();
    const SERVICE_TYPES = [...new Set(adminData.map(beach => beach.Serviço))]
    return (
        <FormControl size="sm" sx={{ minWidth: '10rem' }}>
            <FormLabel>Tipo de Serviço</FormLabel>
            <Select size="sm" placeholder="Todos">
                <Option value="Todos">Todos</Option>
                {SERVICE_TYPES.map(service => (<Option value={service} key={service}>{service}</Option>))}
            </Select>
        </FormControl>
    );
};