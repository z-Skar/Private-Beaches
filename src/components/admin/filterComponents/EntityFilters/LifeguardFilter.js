import { DateFilter } from "../Date"
import { Salary } from "../Salary"
import { StatusFilter } from "../Status"

export const LifeguardFilter = () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
        <DateFilter />
        <Salary />
        <StatusFilter />
    </div>
)