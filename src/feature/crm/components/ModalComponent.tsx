import { Grid, Modal } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import NewEmail from './NewEmail'

export const ModalComponent = () => {
    const { isVisble, children } = useSelector((state: RootState) => state.modalReducer)
    const getChild = () => {
        switch (children) {
            case 'NewEmail':
                return <NewEmail></NewEmail>
            case 'FollowUp':
                return <>Fllow Up</>
        }
        return <></>
    }
    return (
        <Modal
            open={isVisble}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"

        >
            <Grid container direction={'column'} justifyContent={'center'} alignContent={'center'} height={'100%'}>

                {getChild()}
            </Grid>
        </Modal>
    )
}
