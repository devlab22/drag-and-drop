import React from 'react';
import { Grid, Box } from '@mui/material';
import { default as CardItem} from './CardItem'

export default function CardList({ items = [] }) {

    return (
        <Box>
            <Grid
                container
                xs='auto' 
                md='auto'
                spacing={2}
                sx={{
                    ml: '5px',
                    display: 'flex',
                }}
            >
                {items.map(item => (
                    <CardItem
                        key={item.id}
                        {...item}
                    />
                ))}

            </Grid>
        </Box>
    )
}