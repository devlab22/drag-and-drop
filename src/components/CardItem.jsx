import React, { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Card, CardHeader, Stack, Typography } from '@mui/material';

export default function CardItem({ id, text, title, index, moveCard }) {

    const [raised, setRaised] = useState(false);

    const renderKeyValue = (key, value) => {

        return (
            <Stack
                flexDirection='row'
                gap='5px'
                sx={{ ml: '5px'}}
            >

                <Typography
                    variant="h6"
                    component="h5"
                    sx={{opacity: '0.7'}}
                >
                    {key}:
                </Typography>

                <Typography variant="h6" component="h5">
                    {value}
                </Typography>

            </Stack>
        )
    }

    return (
        <Card
            raised={raised}
            onMouseMove={() => setRaised(true)}
            onMouseOut={() => setRaised(false)}
            sx={{ width: '500px', m: '5px', cursor: 'pointer' }}
        >
            <Stack>

                {title && (
                    <CardHeader sx={{ textAlign: 'center' }} title={title} />
                )}

                <Stack
                    flexDirection='column'
                    gap='0'
                >
                    {renderKeyValue('ID', id)}
                    {renderKeyValue('Text', text)}

                </Stack>


            </Stack>

        </Card>

    )
}