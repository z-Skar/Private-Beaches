import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

export const StatusFilter = () => {
    return (
        <FormControl size="sm">
            <FormLabel>Estado</FormLabel>
            <Select size="sm" placeholder="Todos" sx={{ width: '10rem' }}>
                <Option value="all">Todos</Option>
                <Option value={"Em espera"}>Em espera</Option>
                <Option value={"Ativo"}>Ativo</Option>
            </Select>
        </FormControl>
    );
};