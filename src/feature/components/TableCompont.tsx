import { Table, TableHead, TableRow, TableCell, TableBody, Checkbox, Button } from '@mui/material';
import React from 'react'
import { HumanResource } from '../types'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { setIsNewEmail, showModal } from '../crm/state/modal-slice';
import { RootState } from '../../store/store';
const TableCompont = () => {

    const state = useSelector((state: RootState) => state)
    const {crmReducer,pagination} = state
    const {humanResources} = crmReducer
    const {offset} = pagination
    const dispatch = useDispatch()
    const handelSendEmailClick = (item: HumanResource) => {
        console.log('item', item)
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
                    <TableCell>Index</TableCell>
                    <TableCell >Send E-Mail </TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell >Name</TableCell>
                    <TableCell >Is Email Sent Ever ? </TableCell>

                </TableRow>
            </TableHead>
            <TableBody sx={{ height: '300px' }}>
                {humanResources.map((row,i) => (
                    <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell> {offset+(i+1)}</TableCell>
                         <TableCell>
                           <Button variant='contained' color='primary' onClick={() => { handelSendEmailClick(row) }} >Send Email</Button>  <Button variant='contained' color='warning' onClick={() => { handelFollowUpClick(row) }}>Follow Up</Button>
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {row.email}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {
                                row.personalizeEmails.length ? <DoneAllIcon color='success'></DoneAllIcon> : <CloseIcon color='error'></CloseIcon>
                            }
                        </TableCell>
                       

                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default TableCompont