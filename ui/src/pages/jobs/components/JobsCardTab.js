import React from "react";
import { Tab } from "../../../components/Tabs";


// Improvement: Create a specific component using the common Tab component in a refactor.
export const JobsCardTab = ({ index, isActive, handleTabClick, children }) => {
    return (  
        <Tab index={index} isActive={isActive === 0} onClick={() => handleTabClick(0)}>
            {children}
        </Tab>
      )
}