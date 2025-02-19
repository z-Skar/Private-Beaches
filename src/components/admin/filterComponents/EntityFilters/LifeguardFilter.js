import { DateFilter } from "../Date"
import { Salary } from "../Salary"
import { StatusFilter } from "../Status"

export const LifeguardFilter = () => (
    <div style={{ minWidth: '10rem', display: 'flex', flexDirection: 'row', justifyContent: 'start', gap: '1rem', flexWrap: 'wrap' }}>
        <DateFilter />
        <Salary />
        <StatusFilter />
    </div>
)