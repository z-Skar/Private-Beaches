import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { useAdminData } from "contexts/AdminDataContext";

export const CityFilter = () => {
    const { adminData } = useAdminData();
    const CITIES = [ ...new Set(adminData.map(beach => beach.Cidade))];
    
    return (
        <FormControl size="sm" sx={{ minWidth: '10rem' }}>
            <FormLabel>Cidade</FormLabel>
            <Select size="sm" placeholder="Todas">
                <Option value="">Todas</Option>
                {CITIES.map(city => (<Option value={city} key={city}>{city}</Option>))}
            </Select>
        </FormControl>
    );
};