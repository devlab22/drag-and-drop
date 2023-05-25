import * as React from 'react';
import { Typography, Modal, Slide, Snackbar, Alert, AlertTitle, List, ListItem, ListItemText } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function MessageDialog({ autoHide = 6000, toggle = false, title = '', messages, onReject = Function.prototype, width = '400px', severity = 'info' }) {

    return (
        <Modal
            open={toggle}
            onClose={onReject}
        >
            <Snackbar
                autoHideDuration={autoHide}
                open={toggle}
                anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
                TransitionComponent={Transition}
            >
                <Alert
                    variant="filled"
                    severity={severity}
                    onClose={onReject}
                    sx={{ width: width }}
                >
                    {title && <AlertTitle>{title}</AlertTitle>}

                    {Array.isArray(messages) ? (
                        <List sx={{ width: '100%' }}>

                            {messages.length > 0 && messages.map((msg, index) => (
                                <ListItem key={index} disablePadding>
                                    <ListItemText primary={msg} />
                                </ListItem>
                            ))}

                        </List>
                    )
                        : (
                            <Typography
                                variant="h6"
                                component="h5"
                            >
                                {messages}
                            </Typography>
                        )
                    }

                </Alert>
            </Snackbar>
        </Modal>
    )
}