import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Box, Stack } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';

function InputField({ hasInfo, onChange, value, defaultValue, label, type, ariaLabel }) {
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: "30ch" },
                display: 'flex',
                alignItems: 'center'
            }}
            noValidate
            autoComplete="off"
        >
            <Stack direction="row" spacing={1} alignItems="center">
                <TextField 
                    id="outlined-basic" 
                    label={label} 
                    variant="outlined" 
                    value={value}
                    defaultValue={defaultValue}
                    onChange={onChange}
                    aria-label={ariaLabel}
                    sx={{ flex: 1 }}
                    type={type}
                />
                {hasInfo && <HelpIcon />}
            </Stack>
        </Box>
    );
}

InputField.propTypes = {
    hasInfo: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired, 
    value: PropTypes.string.isRequired, 
    type: PropTypes.string, 
    defaultValue: PropTypes.string,
    label: PropTypes.string.isRequired,
    ariaLabel: PropTypes.string.isRequired,
}

InputField.defaultProps = {
    defaultValue: "",
    type: "text"
};

export default InputField;
