import React, { useEffect } from 'react'
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import CrmRoutes from '.'
import Crm from '../routes/Crm'
import { Button, Grid, Modal } from '@mui/material'
import { ModalComponent } from '../components/ModalComponent'
import Loader from '../../components/Loader'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'

const AppRoutes = () => {
    const navigation = useNavigate()

    useEffect(()=>{
        navigation('/crm')
    },[])
    return (
        <>
            <Outlet></Outlet>

        </>
    )
}

export default AppRoutes

