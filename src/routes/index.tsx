import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import CrmRoutes from '../feature/crm/routes'
import Crm from '../feature/crm/routes/Crm'

const AppRoutes = () => {
    return (
        <>
            <Crm></Crm >
        </>
        // <Routes>
        //     <Route path='' element={<CrmRoutes></CrmRoutes>}></Route>
        // </Routes >
    )
}

export default AppRoutes