import { Grid } from '@mui/material'
import React, { useState } from 'react'

const Notes = () => {

    const [activeNote, setActiveNote] = useState('')

    return (
        <Grid container p={2}>
            <Grid item xs={6} >
                <textarea value={activeNote} cols={70} rows={35}></textarea>
            </Grid>
            <Grid container item xs={6} columnGap={'7px'}>
                {[0, 1, 2, 3, 4].map((item) => {
                    return (
                        <Grid boxShadow={'rgba(149, 157, 165, 0.2) 0px 8px 24px;'} sx={{cursor:'pointer'}} item width={200} height={200} onClick={() => { setActiveNote(item.toString()) }} >
                            <h3>{'Title'}</h3>
                            <p>{'Body'}</p>
                        </Grid>
                    )
                })}


            </Grid>
        </Grid>
    )
}

export default Notes