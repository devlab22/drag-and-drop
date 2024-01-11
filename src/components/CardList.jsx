import React from 'react';
import { Grid, Box, Paper } from '@mui/material';
import CardItem from './CardItem'
import DevicesIcon from '@mui/icons-material/Devices';

export default function CardList({ items = [], onRatingUpload, moveCard }) {

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            {/* <Paper
                variant='elevation'
                sx={{
                    width: '97%',
                    alignItems: 'center',
                    mt: '15px'
                }}

            > */}
                <Grid
                    container
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '10px',
                        padding: '10px',
                        alignItems: 'center'
                    }}
                >
                    {items.map((item, index) => (
                        <CardItem
                            key={index}
                            onRatingUpload={onRatingUpload}
                           // avatar={<DevicesIcon/>}
                            // icon='/img/48/network-nfs-2.png'
                           // moveCard={moveCard}
                            index={index}
                            {...item}
                        />
                    ))}

                </Grid>
            {/* </Paper> */}
        </Box>
    )
}