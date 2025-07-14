import { DateFilter } from "../Date";
import { PermissionFilter } from "../Permission";

export const ClientsFilter = () => (
    <div style={{ display: 'flex', gap: '1rem'}}>
        <DateFilter />
        <PermissionFilter />
    </div>
);