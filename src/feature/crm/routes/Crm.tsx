import { Alert, Button, FormLabel, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import React, { useState } from 'react'
import TableCompont from '../../components/TableCompont'

const Crm = () => {

    const [showAlert, setShowAlert] = useState(false)
    return (
        <>

            <Grid container height={'100vh'} padding={2} gap={1} justifyContent={'space-around'}>
                <Grid item lg={4}>
                    {
                        showAlert &&

                        <Alert severity="error">This is a success alert — check it out! <Button>Close </Button></Alert>
                    }
                    <Grid container direction={'column'} gap={2}>
                        <Grid item container direction={'column'}>
                            <FormLabel>Email</FormLabel>
                            <TextField type='email'></TextField>
                        </Grid>

                        <Grid item container gap={2} justifyContent={'space-between'}>
                            <Button variant='contained'>Add An HR</Button>
                            <Grid columnGap={2} >
                                <Button variant='contained' color='warning'>Paste</Button>
                                <Button variant='contained'>Copy</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={7} maxHeight={'95%'} overflow={'scroll'}>
                    <TableContainer component={Paper}>
                        <TableCompont></TableCompont>
                    </TableContainer>
                </Grid>

            </Grid>
        </>
    )
}

export default Crm