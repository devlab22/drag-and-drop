import React, { useRef, useState, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import {
    Card,
    CardHeader,
    CardContent,
    CardMedia,
    Stack,
    Typography,
    Rating,
    CardActionArea,
    CardActions,
    Button
} from '@mui/material';

export default function CardItem({ id, text, title, poster, rating = 0, seqnr, moveCard, onRatingUpload }) {

    const [raised, setRaised] = useState(false);
    const [ratingValue, setRatingValue] = useState(0)

    useEffect(() => {
        setRatingValue(rating)
    }, [rating])

    const renderKeyValue = (key, value) => {

        return (
            <Stack
                flexDirection='row'
                gap='5px'
                sx={{ ml: '5px' }}
            >

                <Typography
                    variant="h6"
                    component="h5"
                    sx={{ opacity: '0.7' }}
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
            sx={{ m: '5px', cursor: 'pointer', width: '350px' }}
        >
            <CardActionArea>
                <Stack>

                    {title && (
                        <CardHeader sx={{ textAlign: 'center' }} title={title} />
                    )}

                    {poster && (
                        <CardMedia
                            sx={{ height: 140 }}
                            image={poster}
                            component='img'
                            title={title}
                            alt={title}
                        />
                    )}


                    <CardContent>
                        <Stack
                            flexDirection='column'
                            gap='0'
                        >
                            {renderKeyValue('ID', id)}
                            {renderKeyValue('Seqnr', seqnr)}
                            {renderKeyValue('Text', text)}

                        </Stack>
                    </CardContent>



                </Stack>
            </CardActionArea>

            <CardActions>
                <Stack
                    gap='10px'
                    flexDirection='row'
                >
                    <Rating
                        name="simple-controlled"
                        value={ratingValue}
                        max={5}
                        precision={0.5}
                        onChange={(event, newValue) => {
                            setRatingValue(newValue);
                        }}
                    />

                    <Button
                        variant="contained"
                        onClick={() => onRatingUpload(id, ratingValue)}
                    >
                        Upload
                    </Button>
                </Stack>

            </CardActions>
        </Card>

    )
}