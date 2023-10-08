import { Table, TableHead, TableRow, TableCell, TableBody, Checkbox, Button } from '@mui/material';
import React from 'react'
import { HumanResource } from '../types'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { setIsNewEmail, showModal } from '../crm/state/modal-slice';
import { RootState } from '../../store/store';
const TableCompont = () => {

    const rows = useSelector((state: RootState) => state.crmReducer.humanResources)
    const dispatch = useDispatch()
    const handelSendEmailClick = (item: HumanResource) => {
        localStorage.setItem('humanResource', JSON.stringify(item))
        dispatch(showModal())
        dispatch(setIsNewEmail(true))
    }
    const handelFollowUpClick = (item: HumanResource) => {
        localStorage.setItem('humanResource', JSON.stringify(item))
        dispatch(showModal())
        dispatch(setIsNewEmail(false))

    }

    return (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: 'GrayText' }}>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell >Email</TableCell>
                    <TableCell >Is Email Sent Ever ? </TableCell>
                    <TableCell >Send E-Mail </TableCell>

                </TableRow>
            </TableHead>
            <TableBody sx={{ maxHeight: '80%' }}>
                {rows.map((row) => (
                    <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {row.email}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {
                                row.personalizeEmails.length ? <DoneAllIcon color='success'></DoneAllIcon> : <CloseIcon color='error'></CloseIcon>
                            }
                        </TableCell>
                        <TableCell>
                            {row.personalizeEmails.length === 0 ? <Button variant='contained' color='primary' onClick={() => { handelSendEmailClick(row) }} >Send Email</Button> : <Button variant='contained' color='warning' onClick={() => { handelFollowUpClick(row) }}>Follow Up</Button>}
                        </TableCell>

                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default TableCompont