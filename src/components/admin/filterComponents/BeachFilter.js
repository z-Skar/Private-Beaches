import { CityFilter } from "./City";
import { CountryFilter } from "./Country";
import { LifeguardsFilter } from "./Lifeguards";
import { ReservationCostFilter } from "./ReservationCost";

export const BeachFilter = () => {
    return (
        <>
            <CityFilter />
            <CountryFilter />
            <ReservationCostFilter />
            <LifeguardsFilter />
        </>
    );
};