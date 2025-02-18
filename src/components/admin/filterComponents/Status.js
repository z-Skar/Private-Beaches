import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

export const StatusFilter = () => {
    return (
        <FormControl size="sm">
            <FormLabel>Estado</FormLabel>
            <Select size="sm" placeholder="All">
                <Option value="all">All</Option>
                <Option value="usa">Ativo</Option>
                <Option value="canada">Em espera</Option>
                <Option value="uk">Férias</Option>
                <Option value="germany">Negado</Option>
            </Select>
        </FormControl>
    );
};