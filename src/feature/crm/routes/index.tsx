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
    const { isVisble } = useSelector((root: RootState) => root.loaderReducer)
    return (
        <>
            <>{
                !isVisble &&
                <>
                    <ModalComponent></ModalComponent>
                    <Crm></Crm >
                </>
            }
            </>
            <>
                {
                    isVisble &&
                        
                    <Loader></Loader>
                }
            </>
        </>
        // <Routes>
        //     <Route path='' element={<CrmRoutes></CrmRoutes>}></Route>
        // </Routes >
    )
}

export default AppRoutes