import React from 'react';
import { Grid, Box, Paper } from '@mui/material';
import { default as CardItem} from './CardItem'

export default function CardList({ items = [], onRatingUpload }) {

    return (
        <Box
        sx={{
            marginTop: '0px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}
        >
            {/*  <Paper
                 variant='outlined'
                    sx={{
                        width: '98%',
                        height: '100%',
                        minHeight: '100%',
                        minWidth: '450px',
                        alignItems: 'center',
                        padding: '10px'
                       
                        
                        
                    }}
                    
                > */}
            <Grid
                container
                spacing={2}
                sx={{
                    ml: '25px',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
               
                   {/*  <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        alignItems: 'center'
                    }} 

                    >*/}
                         {items.map(item => (
                    <CardItem
                        key={item.id}
                        onRatingUpload={onRatingUpload}
                        {...item}
                    />
                ))}  
                    {/* </Box> */}
                 
               

            </Grid>
             {/* </Paper> */}
        </Box>
    )
}