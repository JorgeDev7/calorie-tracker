import { useContext } from "react";
import { ActivityContext } from "../context/ActivityContext";

export const useActivity = () => {
    const context = useContext(ActivityContext);

    if (!context) {
        throw new Error('The Custom Hook must be used with an ActivityProvider');
    }

    return context;
};