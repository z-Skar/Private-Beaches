import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

export const CityFilter = () => {
    
    return (
        <FormControl size="sm">
            <FormLabel>Cidade</FormLabel>
            <Select size="sm" placeholder="All">
                <Option value="all">All</Option>
                <Option value="olivia">Olivia Rhye</Option>
                <Option value="steve">Steve Hampton</Option>
                <Option value="ciaran">Ciaran Murray</Option>
                <Option value="marina">Marina Macdonald</Option>
                <Option value="charles">Charles Fulton</Option>
                <Option value="jay">Jay Hoper</Option>
            </Select>
        </FormControl>
    );
};