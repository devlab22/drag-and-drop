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
    Button,
    Avatar
} from '@mui/material';

export default function CardItem({ id, text, title, poster, icon, avatar, rating = 0, index, moveCard, onRatingUpload=Function.prototype }) {

    const [raised, setRaised] = useState(false);
    const [ratingValue, setRatingValue] = useState(0);
    const ref = useRef(null);

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'card',
        item: { type: 'card', id, index },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        })

    }))

    const [, drop] = useDrop(
        () => ({
            accept: 'card',
            collect: (monitor) => ({
                isOver: !!monitor.isOver()
            }),
            drop(item, monitor) {

                moveCard(item.index, index)

            },
            canDrop(item, monitor) {

                if (index === 0) {
                    return false
                }

                return true;

            },
            hover(item, monitor) {


            }
        })
    )

    drag(drop(ref));

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
            ref={ref}
            raised={raised}
            onMouseMove={() => setRaised(true)}
            onMouseOut={() => setRaised(false)}
            sx={{
                cursor: 'pointer',
                width: '300px',
                opacity: isDragging ? 0.7 : 1
            }}
        >
            <CardActionArea>
                <Stack>

                    {title && (
                        <CardHeader sx={{ textAlign: 'center' }} title={title} />
                    )}

                    {avatar && (

                        <Stack
                            alignItems='center'
                            sx={{
                                mb: '5px'
                            }}
                        >
                            <Avatar
                                sx={{
                                    bgcolor: 'primary.main'
                                }}
                            >
                                {avatar}
                            </Avatar>
                        </Stack>

                    )}

                    {icon && (
                        <Stack
                            alignItems='center'
                            sx={{
                                mb: '5px'
                            }}
                        >
                            <Avatar
                                alt='image'
                                src={icon}
                                sx={{
                                    width: 'auto',
                                    height: '64px'
                                }}
                            />
                        </Stack>
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
                            {renderKeyValue('Index', index)}
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