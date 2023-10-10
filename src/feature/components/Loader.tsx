import { Grid } from '@mui/material'
import React from 'react'

const Loader = () => {
    return (
        <Grid container flexDirection={'column'} justifyContent={'center'} alignItems={'center'} height={'100vh'}>

            <span className="loader"></span>
        </Grid>
    )
}

export default Loader