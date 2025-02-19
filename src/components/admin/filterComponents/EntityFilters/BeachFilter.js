import { CityFilter } from "../City";
import { CountryFilter } from "../Country";
import { LifeguardsFilter } from "../Lifeguards";
import { ReservationCostFilter } from "../ReservationCost";
import { ServicesFilter } from "../ServiceType";
import { RatingFilter } from "../Rating";

export const BeachFilter = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', gap: '1rem', flexWrap: 'wrap' }}>
            <CityFilter />
            <CountryFilter />
            <ReservationCostFilter />
            <LifeguardsFilter />
            <ServicesFilter />
            <RatingFilter />
        </div>
    );
};