import { useState, createContext, useContext, useEffect } from "react";

import axios from "axios"

const AdminDataContext = createContext();

export const AdminDataProvider = ({ children }) => {
    const [adminData, setAdminData] = useState([]);

    const getAdminData = async ( entity ) => {
        try {
            return (await (axios.get(`http://localhost:5000/${entity}/admin`))).data;
        } catch (error) {
            console.log(error);
        };
    };

    return (
        <AdminDataContext.Provider value={{ adminData, getAdminData}}>
            {children}
        </AdminDataContext.Provider>
    );
};

export const useAdminData = () => useContext(AdminDataContext);