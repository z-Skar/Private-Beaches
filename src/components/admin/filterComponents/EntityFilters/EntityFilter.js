import { BeachFilter } from "./BeachFilter";
import { BillsFilter } from "./BillsFilter";
import { LifeguardFilter } from "./LifeguardFilter";
import { ReservationFilter } from "./ReservationFilter";
import { EvaluationsFilter } from "./EvaluationsFilter";
import { ClientsFilter } from "./ClientsFilters";

export const EntityFilter = ({ entity }) => {
    switch (entity) {
        case 'beaches': return <BeachFilter />;
        case 'reservations': return <ReservationFilter />;
        case 'lifeguards': return <LifeguardFilter />;
        case 'bills': return <BillsFilter />
        case 'evaluations': return <EvaluationsFilter />;
        case 'clients': return <ClientsFilter />
    };
};