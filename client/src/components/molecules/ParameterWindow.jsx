import React from 'react';
import { Paper,  Stack } from '@mui/material';
import PropTypes from 'prop-types';

function ParameterWindow({ children }) {
 
    return (
        <Paper 
            variant="outlined" 
            sx={{
                padding: "5em",
                border: '0.5px solid black',
                borderRadius: 5,
                boxShadow: 4,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                width: '18em',
                height: '25em', 
                overflow: 'auto',
            }}
        >
            <Stack 
                spacing={3}             
                sx={{
                    height: '100%', 
                    width: "75%",
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                }}
            >
                { children }
   
            </Stack>
        </Paper>
    );
}

ParameterWindow.propTypes = {
    children: PropTypes.node.isRequired,
}

export default ParameterWindow;
