import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Crm from './Crm'

const CrmRoutes = () => {
    return (
        <Routes>
            <Route path='' element={<Crm></Crm>} ></Route>
        </Routes>
    )
}

export default CrmRoutes