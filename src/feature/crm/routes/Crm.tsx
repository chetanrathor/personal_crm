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
import { useFormik } from 'formik';
import * as yup from 'yup';

const Crm = () => {
    const [email, setEmail] = useState('')
    const [searchEmail, setSearchEmail] = useState('')
    const { alertReducer, crmReducer, pagination } = useSelector((state: RootState) => state)

    const { isVisble, message, alertType } = alertReducer
    const { humanResources } = crmReducer
    const { currentPage, totalPages, limit, offset, count } = pagination
    const dispatch = useDispatch<AppDispatch>()

    const handelCopyClick = () => {
        copy(email)
    }
    const handelPasteClick = () => {
        navigator.clipboard.readText().then((data) => setEmail(data))
    }


    useEffect(() => {
        dispatch(fetchAllHumanResources({ limit, offset, search: searchEmail, order: 'DESC' }))
    }, [limit, offset])

    useEffect(() => {
        dispatch(fetchAllHumanResources({ limit: 10, offset: 0, search: searchEmail, order: 'DESC' }))
    }, [searchEmail])

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
    const formik = useFormik({
        validationSchema: yup.object({
            email: yup.string().email('Must be valid email.').required('Email id is required.')
        }),
        initialValues: {
            email: ''
        },
        onSubmit: (e) => {
            handelAddHRClick()
        }
    })
    const handelAddHRClick = () => {


        dispatch(addNewHumanResource({ email: formik.values.email, name: '' })).then(() => {

            dispatch(fetchAllHumanResources({ limit: 0, offset: 0, search: '', order: 'DESC' }))
            setEmail('')
        })

    }
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
                                <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit() }}>

                                    <Grid item container direction={'column'}>
                                        <FormLabel>Email</FormLabel>
                                        <TextField type='email' name='email' value={formik.values.email} onChange={formik.handleChange}></TextField>
                                        {
                                            (formik.errors.email) ?
                                                <p style={{ color: 'red' }}>{formik.errors.email}</p>
                                                : null
                                        }
                                    </Grid>

                                    <Grid item container mt={2} gap={2} justifyContent={'space-between'}>
                                        <Button type='submit' variant='contained'>Add An HR</Button>
                                        <Grid columnGap={2} >
                                            <Button variant='contained' sx={{ marginRight: 1 }} onClick={handelPasteClick} color='warning'>Paste</Button>
                                            <Button variant='contained' onClick={handelCopyClick}>Copy</Button>
                                        </Grid>
                                    </Grid>
                                </form>

                            </Grid>
                            <Grid container direction={'column'}>

                                <Grid my={2} item>
                                    Total {count}
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
                            <Grid container alignItems={'center'} justifyContent={'space-between'} mb={2}>
                                <Grid item container direction={'column'} xs={6}>
                                    <FormLabel>Search</FormLabel>
                                    <TextField autoFocus value={searchEmail} onChange={(e) => {
                                        setSearchEmail(e.target.value)
                                    }}></TextField>
                                </Grid>
                                <Grid item xs={5} container alignItems={'center'} columnGap={2}>
                                    <Button variant='contained' onClick={() => {
                                        dispatch(fetchAllHumanResources({ limit: 10, offset: 0, search: searchEmail, order: 'DESC' }))

                                    }}>Search</Button>

                                    <Button variant='contained' color='warning' onClick={() => {
                                        setSearchEmail('')
                                    }}>Reset</Button>
                                </Grid>
                            </Grid>
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