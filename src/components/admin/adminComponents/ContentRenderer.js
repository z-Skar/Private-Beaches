import React from "react";
import OrderTable from "./OrderTable";
import OrderList from "./OrderList";
import { entitiesAndNames } from "../utils";

export default function Content({ entity }) {
    const ENTITIES_NAMES = entitiesAndNames();
    const renderContent = () => {
        switch(entity) {
            case 'home':
                return <div>EM BREVE</div>
            case 'beaches':
                return (
                    <>
                        <OrderTable entity={entity} entityName={ENTITIES_NAMES.beaches} />
                        <OrderList entity={entity} entityName={ENTITIES_NAMES.beaches} />
                    </>
                );
            case 'bills':
                return (
                    <>
                        <OrderTable entity={entity} entityName={ENTITIES_NAMES.bills} />
                        <OrderList entity={entity} entityName={ENTITIES_NAMES.bills} />
                    </>
                );
            case 'lifeguards':
                return (
                    <>
                        <OrderTable entity={entity} entityName={ENTITIES_NAMES.lifeguards} />
                        <OrderList entity={entity} entityName={ENTITIES_NAMES.lifeguards} />
                    </>
                );
            case 'evaluations':
                return (
                    <>
                        <OrderTable entity={entity} entityName={ENTITIES_NAMES.evaluations} />
                        <OrderList entity={entity} entityName={ENTITIES_NAMES.evaluations} />
                    </>
                );
            case 'clients':
                return (
                    <>
                        <OrderTable entity={entity} entityName={ENTITIES_NAMES.clients} />
                        <OrderList entity={entity} entityName={ENTITIES_NAMES.clients} />
                    </>
                );
            case 'reservations':
                return (
                    <>
                        <OrderTable entity={entity} entityName={ENTITIES_NAMES.reservations} />
                        <OrderList entity={entity} entityName={ENTITIES_NAMES.reservations} />
                    </>
                );
        }
    }
    return renderContent();
};