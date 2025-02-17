import { BeachFilter } from "./BeachFilter";

export const EntityFilter = ({ entity }) => {
    switch (entity) {
        case 'beaches': return <BeachFilter />;
    };
};