import { Alert, AlertColor, Button, FormLabel, Grid, MenuItem, Pagination, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TableCompont from '../../components/TableCompont'
import copy from "copy-to-clipboard";
import { useDispatch, useSelector } from 'react-redux';
import { addNewHumanResource, fetchAllHumanResources } from '../state/crm-slice';
import { AppDispatch, RootState } from '../../../store/store';
import { hideAlert } from '../state/alert-slice';
import Loader from '../../components/Loader';
import { setLimit, setOffset } from '../state/pagination-slice';

const Crm = () => {
    const [email, setEmail] = useState('')
    const { alertReducer, crmReducer, pagination } = useSelector((state: RootState) => state)

    const { isVisble, message, alertType } = alertReducer
    const { humanResources } = crmReducer
    const { currentPage, totalPages, limit,offset } = pagination
    const dispatch = useDispatch<AppDispatch>()
    const handelAddHRClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log('email', email)
        e.preventDefault();

        dispatch(addNewHumanResource({ email, name: '' })).then(() => {

            dispatch(fetchAllHumanResources({ limit: 0, offset: 0, search: '', order: 'DESC' }))
            setEmail('')
        })

    }

    const handelCopyClick = () => {
        copy(email)
    }
    const handelPasteClick = () => {
        navigator.clipboard.readText().then((data) => setEmail(data))
    }

    useEffect(() => {
        dispatch(fetchAllHumanResources({ limit, offset: 0, search: '', order: 'DESC' }))
    }, [])
    useEffect(() => {
        dispatch(fetchAllHumanResources({ limit, offset, search: '', order: 'DESC' }))
    }, [limit,offset])

    useEffect(() => {
        if (isVisble) {
            setTimeout(() => {
                dispatch(hideAlert(false))
            }, 2000);
        }
    }, [isVisble])

    

    const [showAlert, setShowAlert] = useState(false)
    // 7999626474
    const isVisbleLoader = useSelector((root: RootState) => root.loaderReducer.isVisble)
    return (
        <>
            {
                isVisbleLoader ? <Loader /> :

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
                            <Grid container direction={'column'}>

                                <Grid my={2} item>
                                    Total {humanResources.length}
                                </Grid>
                                <Grid my={2} item>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={limit}
                                        label="Age"
                                        onChange={(e) => {
                                            let limit = Number(e.target.value)
                                            limit = isNaN(limit) ? 0 : limit
                                            dispatch(setLimit(limit))
                                        }}
                                    >
                                        <MenuItem value={0}>All</MenuItem>
                                        <MenuItem value={5}>Five</MenuItem>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={25}>Twenty Five</MenuItem>
                                        <MenuItem value={50}>Fifty</MenuItem>

                                    </Select>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item lg={7} maxHeight={'95%'} overflow={'scrollX'}>
                            <Paper>
                                <TableContainer  >
                                    <TableCompont></TableCompont>
                                </TableContainer>
                            </Paper>
                            <Pagination count={totalPages} page={currentPage} onChange={(e, page) => {
                                console.log('page', page)
                                const offset = (page - 1) * limit
                                dispatch(setOffset(offset))
                            }} color="secondary" />
                        </Grid>
                    </Grid>
            }
        </>
    )
}

export default Crm