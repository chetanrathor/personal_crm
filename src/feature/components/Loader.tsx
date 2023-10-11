import { Button, Grid } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { hideLoader } from '../crm/state/loader.slice'

const Loader = () => {
    const dispatch = useDispatch()
    return (
        <>
            <Grid container flexDirection={'column'} justifyContent={'center'} alignItems={'center'} height={'100vh'}>

                <span className="loader"></span>
            </Grid>
            <Grid><Button onClick={()=>{
                dispatch(hideLoader(false))
            }}>X</Button></Grid>

        </>
    )
}

export default Loader