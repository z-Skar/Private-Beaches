import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { useAdminData } from "contexts/AdminDataContext";

export const LifeguardsFilter = () => {
    const { adminData } = useAdminData();
    const LIFEGUARDS = [...new Set(adminData.map(beach => beach["Salva-Vidas"]))]
    return (
        <FormControl size="sm" sx={{ minWidth: '10rem' }}>
            <FormLabel>Salva-vidas</FormLabel>
            <Select size="sm" placeholder="Todos">
                <Option value="Todos">Todos</Option>
                {LIFEGUARDS.map(lifeguards => (<Option value={lifeguards} key={lifeguards}>{lifeguards}</Option>))}
            </Select>
        </FormControl>
    );
};