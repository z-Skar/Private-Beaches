import React from "react";
import OrderTable from "./OrderTable";
import OrderList from "./OrderList";
import Home from "./Home";
import { entitiesAndNames } from "../utils";

export default function Content({ entity }) {
    const ENTITIES_NAMES = entitiesAndNames();
    const renderContent = () => {
        switch(entity) {
            case 'home':
                return <Home />;
            case 'beaches':
                return (
                    <>
                        <OrderTable entity={entity} entityName={ENTITIES_NAMES.beaches} />
                    </>
                );
            case 'bills':
                return (
                    <>
                        <OrderTable entity={entity} entityName={ENTITIES_NAMES.bills} />
                    </>
                );
            case 'lifeguards':
                return (
                    <>
                        <OrderTable entity={entity} entityName={ENTITIES_NAMES.lifeguards} />
                    </>
                );
            case 'evaluations':
                return (
                    <>
                        <OrderTable entity={entity} entityName={ENTITIES_NAMES.evaluations} />
                    </>
                );
            case 'clients':
                return (
                    <>
                        <OrderTable entity={entity} entityName={ENTITIES_NAMES.clients} />
                    </>
                );
            case 'reservations':
                return (
                    <>
                        <OrderTable entity={entity} entityName={ENTITIES_NAMES.reservations} />
                    </>
                );
        }
    }
    return renderContent();
};