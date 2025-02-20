import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { useAdminData } from "contexts/AdminDataContext";

export const CountryFilter = () => {
    const { adminData } = useAdminData();
    const COUNTRIES = [...new Set(adminData.map(beach => beach.País))]
    return (
        <FormControl size="sm" sx={{ minWidth: '10rem' }}>
            <FormLabel>País</FormLabel>
            <Select size="sm" placeholder="Todos">
                <Option value="Todos">Todos</Option>
                {COUNTRIES.map(country => (<Option value={country} key={country}>{country}</Option>))}
            </Select>
        </FormControl>
    );
};