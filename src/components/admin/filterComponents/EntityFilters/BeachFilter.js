import { CityFilter } from "../City";
import { CountryFilter } from "../Country";
import { LifeguardsFilter } from "../Lifeguards";
import { ReservationCostFilter } from "../ReservationCost";
import { ServicesFilter } from "../ServiceType";
import { RatingFilter } from "../Rating";

export const BeachFilter = () => {
    return (
        <>
            <CityFilter />
            <CountryFilter />
            <ReservationCostFilter />
            <LifeguardsFilter />
            <ServicesFilter />
            <RatingFilter />
        </>
    );
};