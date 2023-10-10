import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import CrmRoutes from '.'
import Crm from '../routes/Crm'
import { Modal } from '@mui/material'
import { ModalComponent } from '../components/ModalComponent'
import Loader from '../../components/Loader'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'

const AppRoutes = () => {
    return (
        <>


            <ModalComponent></ModalComponent>
            <Crm></Crm >
        </>




        // <Routes>
        //     <Route path='' element={<CrmRoutes></CrmRoutes>}></Route>
        // </Routes >
    )
}

export default AppRoutes