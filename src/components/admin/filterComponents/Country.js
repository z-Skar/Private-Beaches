import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

export const CountryFilter = () => {
    return (
        <FormControl size="sm" sx={{ minWidth: '10rem' }}>
            <FormLabel>País</FormLabel>
            <Select size="sm" placeholder="All">
                <Option value="all">All</Option>
                <Option value="usa">USA</Option>
                <Option value="canada">Canada</Option>
                <Option value="uk">UK</Option>
                <Option value="germany">Germany</Option>
                <Option value="france">France</Option>
                <Option value="australia">Australia</Option>
            </Select>
        </FormControl>
    );
};