import { DateFilter } from "../Date"
import { Salary } from "../Salary"
import { StatusFilter } from "../Status"

export const LifeguardFilter = () => (
    <>
        <DateFilter />
        <Salary />
        <StatusFilter />
    </>
)