import { useState, createContext, useContext, useEffect } from "react";

import axios from "axios"

const AdminDataContext = createContext();

export const AdminDataProvider = ({ children }) => {
    const [adminEntity, setAdminEntity] = useState('beaches');
    const [adminData, setAdminData] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState({});

    useEffect(() => {
        const getAdminData = async () => {
            try {
                const DATA = (await (axios.get(`http://localhost:5000/${adminEntity}/admin`))).data;
                setAdminData(DATA);
            } catch (error) {
                console.log(error);
            };
        };
        getAdminData();
    }, [adminEntity]);

    return (
        <AdminDataContext.Provider value={{ adminEntity, setAdminEntity, adminData, selectedFilters, setSelectedFilters }}>
            {children}
        </AdminDataContext.Provider>
    );
};

export const useAdminData = () => useContext(AdminDataContext);