import { Button, Grid, InputLabel, TextField, TextareaAutosize } from '@mui/material'
import React, { useEffect, useState } from 'react'
import newEmailJson from '../../../static/new-email'
import followUp from '../../../static/follow-up.json'
import { useDispatch, useSelector } from 'react-redux'
import { hideModal } from '../state/modal-slice'
import { HumanResource } from '../../types'
import { RootState } from '../../../store/store'
import { useNavigate } from 'react-router-dom'
import { createNewEmail, fetchAllHumanResources } from '../state/crm-slice'
const NewEmail = () => {
    const { isNewEmail } = useSelector((state: RootState) => state.modalReducer)
    const dispatch = useDispatch()
    const [template, setTemplate] = useState(() => {
        const humanResource: HumanResource = JSON.parse(localStorage.getItem('humanResource') ?? "")
        const to = humanResource.email
        if (isNewEmail) {
            const { body, subject } = newEmailJson
            console.log('body', body)
            return {
                to,
                body,
                subject

            }
        } else {
            const { body, subject } = followUp
            return {
                to,
                body:
                    subject

            }
        }
    })

    const setTemplateValue = () => {

    }

    // useEffect(() => {
    //     setTemplateValue()
    // }, [])

    const handelCloseClick = () => {
        dispatch(hideModal())
    }
    // const navigate = useNavigate()
    const handelSendClick = async () => {

        const humanResource: HumanResource = JSON.parse(localStorage.getItem('humanResource') ?? "")
        dispatch(hideModal())
        dispatch(createNewEmail({ body: template.body, subject: template.subject ?? '', humanResource: humanResource.id }) as any)
        const result = await dispatch(fetchAllHumanResources({ limit: 0, offset: 0, search: '', order: 'DESC' }) as any).then((r:any) => {
            if (r.meta.requestStatus === "fulfilled") {
                window.location.href = `mailto:${template.to}?&subject=${template.subject}&body=${encodeURIComponent(template.body)}`

            }
        })
        console.log('result', result)

    }


    return (
        <Grid container maxWidth={{ xs: '80%', lg: '50%' }} direction={'column'} bgcolor={'white'} padding={2} borderRadius={2} gap={2}>
            <Grid item alignSelf={'end'}>
                <Button variant='outlined' sx={{ borderRadius: '10%' }} onClick={handelCloseClick}>X</Button>
            </Grid>
            <Grid item >
                <InputLabel>Subject</InputLabel>
                <TextField value={template.subject} fullWidth></TextField>
            </Grid>
            <Grid item>
                <InputLabel>To:</InputLabel>
                <TextField value={template.to} fullWidth></TextField>
            </Grid>
            <Grid item>
                {/* <TextareaAutosize cols={97} maxLength={80} minRows={10} maxRows={30}></TextareaAutosize> */}
                <textarea value={template.body} name="" id="" cols={30} rows={10} style={{ width: '100%' }} onChange={(e) => setTemplate({ ...template, body: e.target.value })}></textarea>
            </Grid>
            <Grid item>
                <Button variant='contained' onClick={() => { handelSendClick() }}>Send</Button>
                {/* <a href="mailto:chetan@test.com?body=<html>
                <b>Hello</b>
                </html>">cli</a> */}

            </Grid>
        </Grid>
    )
}

export default NewEmail