import { Alert, AlertColor, Button, FormLabel, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TableCompont from '../../components/TableCompont'
import copy from "copy-to-clipboard";
import { useDispatch, useSelector } from 'react-redux';
import { addNewHumanResource, fetchAllHumanResources } from '../state/crm-slice';
import { RootState } from '../../../store/store';
import { hideAlert } from '../state/alert-slice';

const Crm = () => {
    const [email, setEmail] = useState('')
    const { alertReducer, crmReducer } = useSelector((state: RootState) => state)
    const { isVisble, message, alertType } = alertReducer
    const { humanResources } = crmReducer
    const dispatch = useDispatch()
    const handelAddHRClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log('email', email)
        e.preventDefault();

        dispatch(addNewHumanResource({ email, name: '' }) as unknown as any)
        dispatch(fetchAllHumanResources({ limit: '0', offset: '0', search: '', order: 'DESC' }) as any)


    }

    const handelCopyClick = () => {
        copy(email)
    }
    const handelPasteClick = () => {
        navigator.clipboard.readText().then((data) => setEmail(data))
    }

    useEffect(() => {
        dispatch(fetchAllHumanResources({ limit: '0', offset: '0', search: '', order: 'DESC' }) as any)
    }, [])

    useEffect(() => {
        if (isVisble) {
            setTimeout(() => {
                dispatch(hideAlert(false))
            }, 2000);
        }
    }, [isVisble])

    const [showAlert, setShowAlert] = useState(false)
    return (
        <>

            <Grid container height={'100vh'} padding={2} gap={1} justifyContent={'space-around'}>
                <Grid item lg={4}>
                    {
                        isVisble &&

                        <Alert severity={alertType as unknown as AlertColor} >{message}!</Alert>
                    }
                    <Grid container direction={'column'} gap={2}>
                        <Grid item container direction={'column'}>
                            <FormLabel>Email</FormLabel>
                            <TextField type='email' value={email} onChange={(e) => { setEmail(e.target.value) }}></TextField>
                        </Grid>

                        <Grid item container gap={2} justifyContent={'space-between'}>
                            <Button variant='contained' onClick={(e) => { handelAddHRClick(e) }}>Add An HR</Button>
                            <Grid columnGap={2} >
                                <Button variant='contained' sx={{ marginRight: 1 }} onClick={handelPasteClick} color='warning'>Paste</Button>
                                <Button variant='contained' onClick={handelCopyClick}>Copy</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={7} maxHeight={'95%'} overflow={'scroll'}>
                    <Paper>
                        <TableContainer  >
                            <TableCompont></TableCompont>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}

export default Crm