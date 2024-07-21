import React from 'react';
import { Paper,  Stack } from '@mui/material';
import PropTypes from 'prop-types';

function ParameterWindow({ children }) {
 
    return (
        <Paper 
            variant="outlined" 
            sx={{
                padding: "2em 5em 2em 5em",
                border: '0.5px solid black',
                borderRadius: 5,
                boxShadow: 4,
                display: 'flex',
                justifyContent: 'normal',
                alignItems: 'normal',
                textAlign: 'center',
                minWidth: '18em',
                minHeight: '30em',
                maxWidth: '18em',
                maxHeight: '30em', 
                overflow: 'scroll',
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
