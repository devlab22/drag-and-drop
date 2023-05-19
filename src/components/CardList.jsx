import React from 'react';
import { Grid, Box } from '@mui/material';
import { default as CardItem} from './CardItem'

export default function CardList({ items = [], onRatingUpload }) {

    return (
        <Box>
            <Grid
                container
                spacing={2}
                sx={{
                    ml: '5px',
                    display: 'flex',
                }}
            >
                {items.map(item => (
                    <CardItem
                        key={item.id}
                        onRatingUpload={onRatingUpload}
                        {...item}
                    />
                ))}

            </Grid>
        </Box>
    )
}