import React from "react";
import DashboardApp from "./DashboardApp";

const SideBySideApps = () => {

    return <div style={{display: 'flex'}}>
        <div style={{flexGrow: 1}}><DashboardApp /></div>
    </div>
}

export default SideBySideApps